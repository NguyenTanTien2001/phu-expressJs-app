// src/services/file.service.ts

import mongoose, { Types } from 'mongoose';
import { IFile, File } from '../models/file.model';
import { Readable } from 'stream';
import { GridFSBucket, ObjectId } from 'mongodb';
import { TodoItem } from '../models/todoItem.model';

let gfs: GridFSBucket;
mongoose.connection.once('open', () => {
  console.log('MongoDB connection open, initializing GridFS.');
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db!, {
    bucketName: 'uploads'
  });
});

/**
 * Uploads a file, creates its metadata, and links it to a TodoItem.
 * @param file The file object from multer's memory storage.
 * @param todoItemId The ID of the TodoItem to associate the file with.
 * @returns A promise that resolves to the created IFile metadata instance.
 */
export const uploadFile = (file: Express.Multer.File, todoItemId: string): Promise<IFile> => {
  if (!gfs) {
    throw new Error('GridFS is not initialized. Please try again later.');
  }

  return new Promise(async (resolve, reject) => {
    // 1. Check if the parent TodoItem exists
    const todoItem = await TodoItem.findById(todoItemId);
    if (!todoItem) {
      return reject(new Error(`TodoItem with id ${todoItemId} not found.`));
    }

    const readableStream = Readable.from(file.buffer);
    const uploadStream = gfs.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    uploadStream.on('finish', async () => {
      try {
        // 2. Create the File metadata document with the link
        const fileMeta = new File({
          gridfsId: new mongoose.Types.ObjectId(uploadStream.id.toString()),
          todoItemId: new mongoose.Types.ObjectId(todoItemId), // Link to TodoItem
          filename: uploadStream.filename,
          contentType: uploadStream.options.contentType!,
          length: uploadStream.length,
          uploadDate: new Date(),
        });
        await fileMeta.save();

        // 3. Add the new file's ID to the TodoItem's files array
        todoItem.files.push(fileMeta._id as Types.ObjectId);
        await todoItem.save();

        resolve(fileMeta);
      } catch (err) {
        reject(err);
      }
    });

    uploadStream.on('error', (err) => reject(err));
    readableStream.pipe(uploadStream);
  });
};

/**
 * Retrieves file metadata for all files.
 */
export const getFiles = async (): Promise<IFile[]> => {
  return File.find();
};

/**
 * Retrieves file metadata by its document ID.
 */
export const getFileMetaById = async (id: string): Promise<IFile | null> => {
  return File.findById(id);
};

/**
 * Retrieves a file's metadata and opens a GridFS download stream.
 * @param id The Mongoose document ID for the file's metadata.
 * @returns An object with the stream and metadata, or null if not found.
 */
export const downloadFileById = async (id: string) => {
  if (!gfs) {
    throw new Error('GridFS is not initialized.');
  }

  const fileMeta = await File.findById(id);

  if (!fileMeta) {
    return null;
  }

  const stream = gfs.openDownloadStream(new ObjectId(fileMeta.gridfsId));
  return { stream, fileMeta };
};

/**
 * Deletes a file from GridFS, its metadata, and unlinks it from the parent TodoItem.
 * @param id The Mongoose document ID for the file's metadata.
 * @returns The deleted IFile metadata object or null if not found.
 */
export const deleteFile = async (id: string): Promise<IFile | null> => {
  if (!gfs) throw new Error('GridFS is not initialized.');

  // 1. Delete the file metadata document and get the deleted doc back
  const fileMeta = await File.findByIdAndDelete(id);

  if (fileMeta) {
    // 2. Delete the actual file content from GridFS
    await gfs.delete(new ObjectId(fileMeta.gridfsId));

    // 3. Remove the file's ID from the associated TodoItem's files array
    await TodoItem.updateOne(
      { _id: fileMeta.todoItemId },
      { $pull: { files: fileMeta._id } }
    );
  }

  return fileMeta;
}