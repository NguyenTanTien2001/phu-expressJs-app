import { NextFunction, Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, gender, dob } = req.body;
    const User = await UserService.createUser(name, gender, dob);
    res.status(201).json(User);
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const getUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Users = await UserService.getUsers();
    res.json(Users);
  } catch (error) {
    next(error)
  }
};

export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const User = await UserService.getUserById(req.params.id);
    if (!User) return res.status(404).json({ error: 'User not found' });
    res.json(User);
  } catch (error) {
    next(error)
  }
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const { name, gender, dob } = req.body;
    const User = await UserService.updateUser(userId, name, gender, dob);
    if (!User) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', User });
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const User = await UserService.deleteUser(userId);
    if (!User) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully', User });
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};