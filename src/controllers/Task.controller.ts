import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { ErrorHandler } from "../utils/ErrorHandler";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("dsas", req.user);
    // const newTask = await TaskService.createTask({
    //   // createdBy: req.user.id,
    //   ...req.body,
    // });

    return res.status(201).json({
      success: true,
      message: "New Task created",
      // data: newTask,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const newTask = await TaskService.updateTask(id, req.body);

    return res.status(201).json({
      success: true,
      message: "Task updated",
      data: newTask,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const newTask = await TaskService.deleteTask(id);

    return res.status(201).json({
      success: true,
      message: newTask,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const newTask = await TaskService.getTaskById(id);

    return res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let query = req.query ?? {};
    const tasks = await TaskService.getAllTasks(query);

    return res.status(201).json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.statusCode));
  }
};

export const TaskController = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getAllTasks,
};
