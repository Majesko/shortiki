import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const validateRequest = (schema: ZodSchema<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next(); // Proceed if validation passes
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      } else {
        next(error); // Pass unexpected errors to error handler
      }
    }
  };
};
