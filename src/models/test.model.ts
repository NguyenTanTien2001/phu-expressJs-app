import mongoose, { Document, Schema } from 'mongoose';

export interface ITest extends Document {
  title: string;
}

const TestSchema = new Schema<ITest>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export const Test = mongoose.model<ITest>('Test', TestSchema);