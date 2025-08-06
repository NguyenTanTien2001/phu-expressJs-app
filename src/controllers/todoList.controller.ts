import { NextFunction, Request, Response } from 'express';
import * as TodoListService from '../services/todoList.service';

export const createTodoListHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, status } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User could not be identified from token.' });
    }
    
    const todoList = await TodoListService.createTodoList(name, userId, status);
    res.status(201).json(todoList);
  } catch (error) {
    console.log("error ==> ", error);
    next(error);
  }
};

export const getTodoListsHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const todoLists = await TodoListService.getTodoLists();
    res.json(todoLists);
  } catch (error) {
    next(error)
  }
};

export const getTodoListByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const TodoList = await TodoListService.getTodoListById(req.params.id);
    if (!TodoList) return res.status(404).json({ error: 'Todo list not found' });
    res.json(TodoList);
  } catch (error) {
    next(error)
  }
};

export const updateTodoListHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoListId = req.params.id;
    const { name, user_id, status } = req.body;
    const TodoList = await TodoListService.updateTodoList(todoListId, name, user_id, status);
    if (!TodoList) return res.status(404).json({ error: 'Todo list not found' });
    res.status(200).json({ message: 'Todo list updated successfully', TodoList });
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const deleteTodoListHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoListId = req.params.id;
    const TodoList = await TodoListService.deleteTodoList(todoListId);
    if (!TodoList) return res.status(404).json({ error: 'Todo list not found' });
    res.status(200).json({ message: 'Todo list deleted successfully', TodoList });
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};