import { Model, Schema, Document } from "mongoose";
import { ITask } from "../entity/Task.entity";
import { model } from "mongoose";

export interface TaskDocument extends ITask, Document {}

const TaskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["High", "Low"] },
    status: { type: String, enum: ["completed", "in_progress"] },
  },
  { collection: "Task", timestamps: true }
);

export const TaskModel: Model<TaskDocument> = model("Task", TaskSchema);
