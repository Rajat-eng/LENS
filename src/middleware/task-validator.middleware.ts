import { Request, Response, NextFunction } from "express";
import { createTaskValidationSchema } from "../validators/Task.joi.validator";
import { ErrorHandler } from "../utils/ErrorHandler";
export const createTaskValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTaskValidationSchema.validateAsync(req.body);
    next();
  } catch (e: any) {
    next(new ErrorHandler(e.message, e.statusCode || 400));
  }
};
