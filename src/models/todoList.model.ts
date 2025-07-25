import mongoose, { Document, Schema } from 'mongoose';

export interface ITodoList extends Document {
  name: string;
  user_id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const TodoListSchema = new Schema<ITodoList>(
  {
    name: { type: String, required: true },
    user_id: { type: String, required: true, ref: 'User' },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const TodoList = mongoose.model<ITodoList>('TodoList', TodoListSchema);