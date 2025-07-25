import { ITodoItem, TodoItem } from "../models/todoItem.model";

/**
 * Creates a new TodoItem document with the specified name and saves it to the database.
 *
 * @param todoGroupId - The group id of the todoItem to be created.
 * @param name - The name of the todoItem to be created.
 * @param des - The description of the todoItem to be created.
 * @param due_at - The due date of the todoItem to be created.
 * @returns A promise that resolves to the created ITodoItem instance.
 */
export const createTodoItem = async (todoGroupId: string, name: string, des: string, due_at: Date, status: string): Promise<ITodoItem> => {
  const user = new TodoItem({ todoGroupId, name, des, due_at, status });
  return await user.save();
};

/**
 * Retrieves a list of todoItem from the database.
 *
 * @returns A promise that resolves to an array of `ITodoItem` objects.
 */
export const getTodoItems = async (): Promise<ITodoItem[]> => {
  return await TodoItem.find();
};