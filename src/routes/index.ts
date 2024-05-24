import express from "express";
import userRouter from "./userRoute";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

export default mainRouter;
