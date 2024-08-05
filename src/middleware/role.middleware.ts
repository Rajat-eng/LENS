import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import { Role } from "../utils/roles";
export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    const permissions = new Role().getPermissionsRoleByName(role);

    if (!permissions.includes(permission)) {
      return next(
        new ErrorHandler("You are not allowed to access this resource", 403)
      );
    } else {
      next();
    }
  };
};
