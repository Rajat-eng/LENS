import express from "express";
import userRouter from "./user.route";
import taskRouter from "./task.route";
import { isAuthenticated } from "../middleware/auth.middleware";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/task", isAuthenticated, taskRouter);

export default mainRouter;
