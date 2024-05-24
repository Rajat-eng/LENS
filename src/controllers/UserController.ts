import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.middleare";
import { UserService } from "../services/userService";
import { ErrorHandler } from "../utils/ErrorHandler";

const create = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.create(req.body);
    return res.status(201).json({ success: true, data: user });
  }
);

const login = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.login(req.body);

    const access_token = user.signAccessToken();
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
      message: "Logged in successFully",
    });
  }
);

const getUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.getUserById(req.user);
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
);

const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged ot successfully",
    });
  }
);

export const UserController = { create, login, getUser, logoutUser };
