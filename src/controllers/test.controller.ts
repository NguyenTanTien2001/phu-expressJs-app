import { NextFunction, Request, Response } from 'express';
import * as testService from '../services/test.service';

export const createTestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const test = await testService.createTest(title);
    res.status(201).json(test);
  } catch (error) {
    console.log("error ==> ", error);
    next(error)
  }
};

export const getTestsHandler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const tests = await testService.getTests();
        res.json(tests);
    } catch (error) {
        next(error)
    }
};