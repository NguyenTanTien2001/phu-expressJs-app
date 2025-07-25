import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  gender: string;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);