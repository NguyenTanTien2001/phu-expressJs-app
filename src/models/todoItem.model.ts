import mongoose, { Document, Schema } from 'mongoose';

export interface ITodoItem extends Document {
  todoGroupId: string;
  name: string;
  des: string;
  due_at: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const TodoItemSchema = new Schema<ITodoItem>(
  {
    todoGroupId: { type: String, required: true, ref: 'TodoList' },
    name: { type: String, required: true },
    des: { type: String },
    due_at: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const TodoItem = mongoose.model<ITodoItem>('TodoItem', TodoItemSchema);