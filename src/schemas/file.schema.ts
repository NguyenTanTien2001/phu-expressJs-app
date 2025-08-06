import { z } from 'zod';

export const fileActionParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, { message: 'File ID in URL cannot be empty.' })
      // Optional: Add a regex to ensure it looks like a valid ObjectId
      // .regex(/^[0-9a-fA-F]{24}$/, 'File ID must be a valid MongoID.'),
  }),
});


export const uploadFileSchema = z.object({
  body: z.object({
    todoItemId: z.string().min(1, { message: 'todoItemId is required.' })
      // .regex(/^[0-9a-fA-F]{24}$/, 'todoItemId must be a valid MongoID.'),
  }),
});