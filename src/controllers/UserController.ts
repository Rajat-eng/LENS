import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.middleare";
import { UserService } from "../services/userService";
import { ErrorHandler } from "../utils/ErrorHandler";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.create(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = await UserService.login(req.body);

    const accessTokenExpire = parseInt(
      process.env.ACCESS_TOKEN_EXPIRE || "",
      10
    );
    res.cookie("token", access_token, {
      expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000), // 5 hrs
      maxAge: accessTokenExpire * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      data: access_token,
      message: "Logged in successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getUserById(req.user);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged oot successfully",
    });
  }
);

export const UserController = { create, login, getUser, logoutUser };
