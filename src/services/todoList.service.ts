import { ITodoList, TodoList } from "../models/todoList.model";

/**
 * Creates a new TodoList document with the specified title and saves it to the database.
 *
 * @param title - The title of the todoList to be created.
 * @returns A promise that resolves to the created ITodoList instance.
 */
export const createTodoList = async (name: string, user_id: string, status: string): Promise<ITodoList> => {
  const user = new TodoList({ name, user_id, status });
  return await user.save();
};

/**
 * Retrieves a list of todoList from the database.
 *
 * @returns A promise that resolves to an array of `ITodoList` objects.
 */
export const getTodoLists = async (): Promise<ITodoList[]> => {
  return await TodoList.find();
};