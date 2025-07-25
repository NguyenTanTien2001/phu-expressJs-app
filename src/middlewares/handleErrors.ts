import { NextFunction, Response, Request } from "express"
import { AppError } from "../core/errors/AppError"
import { ErrorRequestHandler } from "express-serve-static-core"

/**
 * Express middleware for centralized error handling.
 *
 * Handles errors thrown in the application. If the error is an instance of `AppError`,
 * it responds with the specific status code and error message. Otherwise, it returns
 * a generic 500 status code with a "System Error" message.
 *
 * @param err - The error object thrown in the application.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 */
export const  errorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      res.status(Number((err as AppError).statusCode)).json({
          message: err.message
      })
    } else {
      res.status(500).json({
          message: "System Error"
      })
    }
}