import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

require("dotenv").config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ErrorHandler("login first", 400);
    }
    const verifyUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    req.user = verifyUser.id;
    next();
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};
