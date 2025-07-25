import { ITodoList, TodoList } from "../models/todoList.model";
import { TodoItem } from "../models/todoItem.model";

/**
 * Creates a new TodoList document with the specified title and saves it to the database.
 *
 * @param name - The name of the todoList to be created.
 * @param user_id - The id of user that the todoList to be created belong to.
 * @param status - The status of the todoList to be created.
 * @returns A promise that resolves to the created ITodoList instance.
 */
export const createTodoList = async (name: string, user_id: string, status: string): Promise<ITodoList> => {
  const todoList = new TodoList({ name, user_id, status });
  return await todoList.save();
};

/**
 * Retrieves a list of todoList from the database.
 *
 * @returns A promise that resolves to an array of `ITodoList` objects.
 */
export const getTodoLists = async (): Promise<ITodoList[]> => {
  return await TodoList.find();
};

/**
 * Retrieves a TodoList by id from the database.
 *
 * @param id - The id of the TodoList to be created.
 * @returns A promise that resolves to an instance of `ITodoList` of null or undefined objects.
 */
export const getTodoListById = async (id: string): Promise<ITodoList | null | undefined> => {
  return await TodoList.findOne({ _id: id });
};

/**
 * Update a TodoList in the database.
 *
 * @param id - The id of the TodoList to be created.
 * @param name - The name of the todoList to be created.
 * @param user_id - The id of user that the todoList to be created belong to.
 * @param status - The status of the todoList to be created.
 * @returns A promise that resolves to an instance of `ITodoList` of null or undefined objects.
 */
export const updateTodoList = async (id: string, name: string, gender: string, dob: Date): Promise<ITodoList | null | undefined> => {
  const result = await TodoList.findOneAndUpdate({ _id: id }, { name, gender, dob }, { new: true });
  return result;
};

/**
 * delete a TodoList by id from the database.
 *
 * @param id - The id of the TodoList to be created.
 * @returns A promise that return to an instance of `ITodoList` of null or undefined objects.
 */
export const deleteTodoList = async (id: string): Promise<ITodoList | null | undefined> => {
  // Find all TodoItem linked to this todoList
  const todoItems = await TodoItem.find({ todoGroupId: id });
  const todoItemIds = todoItems.map(list => list._id);

  // Delete all TodoItems linked to these TodoLists
  await TodoItem.deleteMany({ _id: { $in: todoItemIds } });

  // Finally, delete the TodoList
  const result = await TodoList.findByIdAndDelete({ _id: id });

  return result;
};