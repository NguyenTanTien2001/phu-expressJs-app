import { z } from 'zod';

// For required string fields, the modern approach is to declare the type
// and then chain a validation like .min(1) to ensure it's not empty.
// The base type check (e.g., "Expected string, received number") is handled automatically.

export const createTodoSchema = z.object({
  body: z.object({
    todoGroupId: z.string().min(1, { message: 'Todo group ID is required.' }),

    name: z.string()
      .min(1, { message: 'Name is required.' })
      .min(3, { message: 'Name must be at least 3 characters long.' }),

    des: z.string().optional(), // Optional fields are correct as they are

    due_at: z.string()
      .min(1, { message: 'Due date is required.' })
      .datetime({ message: 'Due date must be a valid ISO 8601 date string.' }),

    status: z.string().min(1, { message: 'Status is required.' }),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    // Optional fields do not need the .min(1) check
    todoGroupId: z.string().optional(),
    name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
    des: z.string().optional(),
    due_at: z.string().datetime().optional(),
    status: z.string().optional(),
  }),
  params: z.object({
    // A URL param should not be empty
    id: z.string().min(1, { message: 'Todo item ID in URL cannot be empty.' }),
  }),
});

export const fileUploadSchema = z.object({
  body: z.object({
    todoItemId: z.string().min(1, { message: 'todoItemId is required.' }),
  }),
});

// Type inference remains correct
export type CreateTodoInput = z.infer<typeof createTodoSchema>['body'];
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;