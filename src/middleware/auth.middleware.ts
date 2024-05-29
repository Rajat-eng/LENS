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
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ErrorHandler("login first", 400);
    }
    const verifyUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    console.log("verify", verifyUser);
    req.user = verifyUser.id;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Session expired", 440));
    } else if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid Token", 401));
    }
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};
