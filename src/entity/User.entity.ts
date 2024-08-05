import { Document } from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *
 *    CreateUserResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         _id:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *    LoginUserInput:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *
 *    LoginUserResponse:
 *       type: object
 *       properties:
 *        token:
 *          type: string
 *        success:
 *          type: boolean
 *          default: true
 *        message:
 *          type: string
 *          default: Logged in successfully
 *
 *    LoginErrorResponse:
 *       type: object
 *       properties:
 *        success:
 *          type: boolean
 *          default: false
 *        message:
 *          type: string
 *          default: User or password is incorrect
 *
 *    GetUserResponse:
 *       type: object
 *       properties:
 *        success:
 *          type: boolean
 *          default: false
 *        user:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *
 *    GetUserErrorResponse:
 *        type: object
 *        properties:
 *            success:
 *              type: boolean
 *              default: false
 *            message:
 *              type: string
 *              default: Authentication failed due to invalid token. Please login again
 *    GetLogoutResponse:
 *        type: object
 *        properties:
 *            success:
 *              type: boolean
 *              default: true
 *            message:
 *              type: string
 *              default: Logged out successfully
 */

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: String;
  manager: String;
}
