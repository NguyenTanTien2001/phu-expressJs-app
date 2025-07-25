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
  const todoItem = new TodoItem({ todoGroupId, name, des, due_at, status });
  return await todoItem.save();
};

/**
 * Retrieves a list of todoItem from the database.
 *
 * @returns A promise that resolves to an array of `ITodoItem` objects.
 */
export const getTodoItems = async (): Promise<ITodoItem[]> => {
  return await TodoItem.find();
};

/**
 * Retrieves a TodoItem by id from the database.
 *
 * @returns A promise that resolves to an instance of `ITodoItem` of null or undefined objects.
 */
export const getTodoItemById = async (id: string): Promise<ITodoItem | null | undefined> => {
  return await TodoItem.findOne({ _id: id });
};

/**
 * Update a TodoItem in the database.
 *
 * @param id - The id of the todoItem to be created.
 * @param todoGroupId - The group id of the todoItem to be created.
 * @param name - The name of the todoItem to be created.
 * @param des - The description of the todoItem to be created.
 * @param due_at - The due date of the todoItem to be created.
 * @returns A promise that resolves to an instance of `ITodoItem` of null or undefined objects.
 */
export const updateTodoItem = async (id: string, todoGroupId: string, name: string, des: string, due_at: Date, status: string): Promise<ITodoItem | null | undefined> => {
  const result = await TodoItem.findOneAndUpdate({ _id: id }, { todoGroupId, name, des, due_at, status }, { new: true });
  return result;
};

/**
 * delete a TodoItem by id from the database.
 *
 * @param id - The id of the todoItem to be created.
 * @returns A promise that return to an instance of `ITodoItem` of null or undefined objects.
 */
export const deleteTodoItem = async (id: string): Promise<ITodoItem | null | undefined> => {
  return await TodoItem.findOneAndDelete({ _id: id });
};