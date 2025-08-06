import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = 
  (schema: ZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // The schema will parse and validate the request body, params, and query
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // THE FIX IS HERE: Use error.issues instead of error.errors
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.issues.map(e => ({ path: e.path, message: e.message })),
        });
      }
      // For any other unexpected errors, pass them to the global error handler
      next(error);
    }
  };