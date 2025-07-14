import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const createUserBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  lastname: Joi.string().required(),
  birthdate: Joi.date().required(),
  email: Joi.string()
    .pattern(emailPattern)
    .message("Ingrese un email válido")
    .required(),
  password: Joi.string().min(4).max(20).required(),
  isAdmin: Joi.boolean().optional().default(false),
  isActive: Joi.boolean().optional().default(true),
});

export const createUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = createUserBodyValidationSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }
  next();
};

const updateUserBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  lastname: Joi.string().optional(),
  birthdate: Joi.date().iso().required(),
  email: Joi.string()
    .pattern(emailPattern)
    .message("Ingrese un email válido")
    .optional(),
  isAdmin: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
});

const userParamValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: bodyError } = updateUserBodyValidationSchema.validate(req.body);
  const { error: paramError } = userParamValidationSchema.validate(req.params);

  if (bodyError) {
    res.status(400).json({
      message: bodyError.details[0].message,
      error: true,
    });
    return;
  }
  if (paramError) {
    res.status(400).json({
      message: paramError.details[0].message,
      error: true,
    });
    return;
  }

  next();
};

export const deleteUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  
  const { error } = userParamValidationSchema.validate(req.params);
  
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  }

  next();
};

