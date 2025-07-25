import { NextFunction, Request, Response } from 'express';
import * as todoListService from '../services/todoList.service';

export const createTodoListHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, user_id, status } = req.body;
    const todoList = await todoListService.createTodoList(name, user_id, status);
    res.status(201).json(todoList);
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const getTodoListsHandler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const todoLists = await todoListService.getTodoLists();
        res.json(todoLists);
    } catch (error) {
        next(error)
    }
};