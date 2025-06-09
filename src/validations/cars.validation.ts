import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createCarBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(500).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).required(),
  image: Joi.string().uri().required(),
});

export const createCarValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = createCarBodyValidationSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  } else {
    next();
  }
};

const updateCarBodyValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  description: Joi.string().min(3).max(500).optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().hex().length(24).optional(),
  image: Joi.string().uri().optional(),
});

const carIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateCarValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error: bodyError } = updateCarBodyValidationSchema.validate(req.body);

  const { error: paramError } = carIdSchema.validate(req.params);
  if (paramError) {
    res.status(400).json({
      message: paramError.details[0].message,
      error: true,
    });
  }
  if (bodyError) {
    res.status(400).json({
      message: bodyError.details[0].message,
      error: true,
    });
  } else {
    next();
  }
};

export const deleteCarValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const carIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });

  const { error } = carIdSchema.validate(req.params);

  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      error: true,
    });
  } else {
    next();
  }
};
