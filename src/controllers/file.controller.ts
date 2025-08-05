import { NextFunction, Request, Response } from 'express';
import * as FileService from '../services/file.service';

export const uploadFileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoItemId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'File data is required.' });
    }
    if (!todoItemId) {
      return res.status(400).json({ error: 'todoItemId is required.' });
    }

    const fileMeta = await FileService.uploadFile(req.file, todoItemId);
    res.status(201).json(fileMeta);
  } catch (error) {
    console.error("Error uploading file:", error);
    next(error);
  }
};

export const getFilesHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const files = await FileService.getFiles();
    res.json(files);
  } catch (error) {
    next(error);
  }
};

export const downloadFileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await FileService.downloadFileById(req.params.id);

    if (!result) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const { stream, fileMeta } = result;

    // Set headers using the RELIABLE metadata from our database
    res.set('Content-Type', fileMeta.contentType);
    res.set('Content-Disposition', `inline; filename="${fileMeta.filename}"`);

    // Listen for errors on the stream and pass them to the error handler
    stream.on('error', (err) => {
      next(err);
    });

    // Pipe the file stream directly to the client's response
    stream.pipe(res);
  } catch (error) {
    // This will catch errors from the service call itself (e.g., GridFS not init)
    console.error("Error in downloadFileHandler:", error);
    next(error);
  }
};

export const deleteFileHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileId = req.params.id;
    const file = await FileService.deleteFile(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }
    res.status(200).json({ message: 'File deleted successfully.', file });
  } catch (error) {
    console.error("Error deleting file:", error);
    next(error);
  }
};