import { z } from 'zod';

// Reusable schema for validating a MongoDB ID in the URL params
export const params = z.object({
  id: z.string().min(1, { message: 'Account ID in URL cannot be empty.' }),
});

// Schema for the public-facing REGISTER endpoint
export const registerAccountSchema = z.object({
  body: z.object({
    username: z.string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .max(20, { message: 'Username cannot be longer than 20 characters.' })
      // Optional: Add a regex for allowed characters
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.'),

    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters long.' }),
      // For better security, you could add more checks:
      // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      // .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      // .regex(/[0-9]/, 'Password must contain at least one number.'),

    // User details required for registration
    name: z.string().min(1, { message: 'Name is required.' }),
    gender: z.string().min(1, { message: 'Gender is required.' }),
    dob: z.string().datetime({ message: 'Date of birth must be a valid ISO 8601 date string.' }),
  }),
});

// Schema for the public-facing LOGIN endpoint
export const loginAccountSchema = z.object({
  body: z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  }),
});

// Schema for the internal UPDATE endpoint.
// Note: This schema is based on the parameters in your `updateAccount` service function.
export const updateAccountSchema = z.object({
  params, // Reuses the ID param schema
  body: z.object({
    user_id: z.string().optional(),
    username: z.string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.')
      .optional(),
    hashedPassword: z.string().optional(), // It's rare to update a hash directly
    accessToken: z.string().optional(),
    status: z.string().optional(),
  }),
});

// Exporting the inferred TypeScript types for use in your application
export type RegisterAccountInput = z.infer<typeof registerAccountSchema>['body'];
export type LoginAccountInput = z.infer<typeof loginAccountSchema>['body'];
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;