import { NextFunction, Request, Response } from 'express';
import * as todoItemService from '../services/todoItem.service';

export const createTodoItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoGroupId, name, des, due_at, status } = req.body;
    const todoItem = await todoItemService.createTodoItem(todoGroupId, name, des, due_at, status);
    res.status(201).json(todoItem);
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const getTodoItemsHandler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const todoItems = await todoItemService.getTodoItems();
        res.json(todoItems);
    } catch (error) {
        next(error)
    }
};