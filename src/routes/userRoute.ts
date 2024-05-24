import express from "express";
import { UserController } from "../controllers/UserController";
import { createUserValidator } from "../middleware/user-validator.middleware";
import { isAuthenticated } from "../middleware/auth.middleware";

const userRouter = express.Router();

/**
 * @openapi
 * '/api/users/create-user':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 */
userRouter.post("/create-user", createUserValidator, UserController.create);

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      409:
 *        description: Failure
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginErrorResponse'
 */
userRouter.post("/login", UserController.login);
/**
 * @openapi
 * '/api/users/profile':
 *  get:
 *     tags:
 *     - User
 *     summary: get logged in user profile
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserResponse'
 *      404:
 *        description: Failure
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserErrorResponse'
 */

userRouter.get("/profile", isAuthenticated, UserController.getUser);

/**
 * @openapi
 * '/api/users/logout':
 *  get:
 *     tags:
 *     - User
 *     summary: get logged in user logged out
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetLogoutResponse'
 *      404:
 *        description: Failure
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserErrorResponse'
 */
userRouter.get("/logout", isAuthenticated, UserController.logoutUser);
export default userRouter;
