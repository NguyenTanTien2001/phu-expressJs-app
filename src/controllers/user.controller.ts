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