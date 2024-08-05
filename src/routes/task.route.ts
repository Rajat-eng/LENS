import express from "express";
import { createTaskValidator } from "../middleware/task-validator.middleware";
import { TaskController } from "../controllers/Task.controller";
import { checkPermission } from "../middleware/role.middleware";

const taskRouter = express.Router();

taskRouter.post(
  "/create",
  // createTaskValidator,
  // checkPermission("create_task"),
  TaskController.createTask
);

taskRouter
  .route("/")
  .get(checkPermission("read_task"), TaskController.getAllTasks);

taskRouter
  .route("/:id")
  .get(checkPermission("read_task"), TaskController.getTaskById)
  .patch(checkPermission("update_task"), TaskController.updateTask)
  .delete(checkPermission("delete_task"), TaskController.deleteTask);

export default taskRouter;
