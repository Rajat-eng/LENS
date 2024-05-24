import { Request, Response, NextFunction } from "express";
import { createUserValidationSchema } from "../validators/User.joi.validator";
import { ErrorHandler } from "../utils/ErrorHandler";
export const createUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createUserValidationSchema.validateAsync(req.body);
    next();
  } catch (e: any) {
    next(new ErrorHandler(e.message, e.statusCode || 400));
  }
};
