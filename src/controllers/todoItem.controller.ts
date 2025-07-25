import { NextFunction, Request, Response } from 'express';
import * as TodoItemService from '../services/todoItem.service';

export const createTodoItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoGroupId, name, des, due_at, status } = req.body;
    const todoItem = await TodoItemService.createTodoItem(todoGroupId, name, des, due_at, status);
    res.status(201).json(todoItem);
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const getTodoItemsHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const todoItems = await TodoItemService.getTodoItems();
    res.json(todoItems);
  } catch (error) {
    next(error)
  }
};

export const getTodoItemByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const TodoItem = await TodoItemService.getTodoItemById(req.params.id);
    if (!TodoItem) return res.status(404).json({ error: 'Todo item not found' });
    res.json(TodoItem);
  } catch (error) {
    next(error)
  }
};

export const updateTodoItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoItemId = req.params.id;
    const { todoGroupId, name, des, due_at, status } = req.body;
    const TodoItem = await TodoItemService.updateTodoItem(todoItemId, todoGroupId, name, des, due_at, status);
    if (!TodoItem) return res.status(404).json({ error: 'Todo item not found' });
    res.status(200).json({ message: 'Todo item updated successfully', TodoItem });
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const deleteTodoItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoItemId = req.params.id;
    const TodoItem = await TodoItemService.deleteTodoItem(todoItemId);
    if (!TodoItem) return res.status(404).json({ error: 'Todo item not found' });
    res.status(200).json({ message: 'Todo item deleted successfully', TodoItem });
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};