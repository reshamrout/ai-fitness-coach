import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
  } else if (err.name === 'ZodError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    // @ts-ignore - safe because we check err.name
    message = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
  } else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    statusCode = 409;
    code = 'CONFLICT';
    message = 'Duplicate key error';
  } else {
    // Log unexpected errors
    console.error('Unhandled Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    }
  });
};
