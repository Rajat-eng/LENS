import { ICreateTask } from "../Interfaces/Task/task.interface";
import { TaskDocument, TaskModel } from "../Schema/Task.Schema";
import { ErrorHandler } from "../utils/ErrorHandler";

const createTask = async (body: ICreateTask): Promise<TaskDocument> => {
  try {
    const newTask = await TaskModel.create(body);
    return newTask;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const updateTask = async (
  id: string,
  body: Partial<ICreateTask>
): Promise<TaskDocument | null> => {
  try {
    const newTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...body,
        },
      },
      {
        new: true,
      }
    );
    if (!newTask) {
      throw new ErrorHandler("Task not found", 404);
    }
    return newTask;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const deleteTask = async (id: string): Promise<string> => {
  try {
    const res = await TaskModel.findByIdAndDelete(id);
    if (!res) {
      throw new ErrorHandler("Task not found", 404);
    }
    return "task Deleted";
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const getTaskById = async (id: string): Promise<TaskDocument | null> => {
  try {
    const task = await TaskModel.findById(id);
    return task;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

const getAllTasks = async (query: Record<string, any>) => {
  try {
    const tasks = await TaskModel.find(query);
    return tasks;
  } catch (error: any) {
    throw new ErrorHandler(error.message, error.statusCode);
  }
};

export const TaskService = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getAllTasks,
};
