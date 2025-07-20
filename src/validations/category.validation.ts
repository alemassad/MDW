import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const createCategoryBodySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(500).required(),
  cars: Joi.array().items(Joi.string().hex().length(24)).optional(),
  isActive: Joi.boolean().optional(),
});

const updateCategoryBodySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  description: Joi.string().min(3).max(500).optional(),
  cars: Joi.array().items(Joi.string().hex().length(24)).optional(),
  isActive: Joi.boolean().optional(),
});

const categoryParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const createCategoryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createCategoryBodySchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
    return;
  }
  next();
};

export const updateCategoryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error: bodyError } = updateCategoryBodySchema.validate(req.body);
  const { error: paramError } = categoryParamSchema.validate(req.params);

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

export const deleteCategoryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = categoryParamSchema.validate(req.params);
  if (error) {
     res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
    return;
  }
  next();
};