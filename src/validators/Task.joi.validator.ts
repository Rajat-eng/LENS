import Joi from "joi";

export const createTaskValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  assignedTo: Joi.string().required(),
  dueDate: Joi.date().iso().greater(Date.now()),
  priority: Joi.string().required(),
  status: Joi.string().required(),
});
