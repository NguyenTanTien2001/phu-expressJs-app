import { z } from 'zod';

// Schema for validating the creation of a new TodoList
export const createTodoListSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, { message: 'Name is required.' })
      .min(3, { message: 'Name must be at least 3 characters long.' }),

    status: z.string().min(1, { message: 'Status is required.' }),
  }),
});

// Schema for validating the update of an existing TodoList
// Note: This follows your controller's logic, which expects name, user_id, and status.
// You will need to adjust your service layer to match this.
export const updateTodoListSchema = z.object({
  params: z.object({
    id: z.string().min(1, { message: 'TodoList ID in URL cannot be empty.' }),
  }),
  body: z.object({
    // All fields are optional during an update
    name: z.string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .optional(),

    user_id: z.string()
      // .regex(/^[0-9a-fA-F]{24}$/, 'User ID must be a valid MongoID.')
      .optional(),
      
    status: z.string().optional(),
  }),
});

// We can also export the inferred TypeScript types for use elsewhere
export type CreateTodoListInput = z.infer<typeof createTodoListSchema>['body'];
export type UpdateTodoListInput = z.infer<typeof updateTodoListSchema>;
