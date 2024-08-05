import Joi from "joi";

export const createUserValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2, // the minimum number of domain segments (e.g. x.y.z has 3 segments)
      tlds: { allow: ["com", "net"] }, // allowed domains
    })
    .required(),
});
