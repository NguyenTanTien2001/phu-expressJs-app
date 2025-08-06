import { z } from 'zod';

// For reusability, we can define a schema just for the URL parameter
export const params = z.object({
  id: z.string().min(1, { message: 'User ID in URL cannot be empty.' }),
});

// Schema for validating the creation of a new User
export const createUserSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, { message: 'Name is required.' })
      .min(2, { message: 'Name must be at least 2 characters long.' }),

    gender: z.string()
      .min(1, { message: 'Gender is required.' }),
      // For more robust validation, you could use an enum:
      // .enum(['Male', 'Female', 'Other'], { errorMap: () => ({ message: "Gender must be 'Male', 'Female', or 'Other'" }) }),

    dob: z.string()
      .min(1, { message: 'Date of birth is required.' })
      .datetime({ message: 'Date of birth must be a valid ISO 8601 date string (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ").' }),
  }),
});

// Schema for validating the update of an existing User
export const updateUserSchema = z.object({
  params, // Reusing the params schema from above
  body: z.object({
    // All fields are optional during an update
    name: z.string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .optional(),

    gender: z.string()
      // .enum(['Male', 'Female', 'Other'])
      .optional(),

    dob: z.string()
      .datetime({ message: 'Date of birth must be a valid ISO 8601 date string.' })
      .optional(),
  }),
});

// Exporting the inferred TypeScript types
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>;