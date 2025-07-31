import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
    user_id: string;
    username: string;
    hashedPassword: string;
    accessToken: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const AccountSchema = new Schema<IAccount>(
    {
        user_id: { type: String, required: true, ref: 'User' },
        username: { type: String, required: true },
        hashedPassword: { type: String, required: true },
        accessToken: { type: String },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

export const Account = mongoose.model<IAccount>('Account', AccountSchema);