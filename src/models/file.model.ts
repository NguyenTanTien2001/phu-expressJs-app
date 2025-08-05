import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  gridfsId: mongoose.Types.ObjectId; // ID of the file in GridFS
  todoItemId: mongoose.Types.ObjectId;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: Date;
}

const FileSchema = new Schema<IFile>({
  gridfsId: { type: Schema.Types.ObjectId, required: true, unique: true },
  todoItemId: { type: Schema.Types.ObjectId, required: true, ref: 'TodoItem' },
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  length: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

export const File = mongoose.model<IFile>('File', FileSchema);