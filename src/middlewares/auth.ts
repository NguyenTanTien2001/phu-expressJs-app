// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isCustomJWTPayload } from '../types/jwt.payload';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticator = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    if (isCustomJWTPayload(decodedPayload)) {
      req.user = decodedPayload;
      next();
    } else {
      res.status(403).json({ error: 'Forbidden: Token payload is malformed' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
