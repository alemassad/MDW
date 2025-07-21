import { Request, Response, NextFunction } from "express";
import { Car, Category } from "../models";

export const getCars = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cars = await Car.find();
    res.status(200).json({
      message: "Cars retrieved successfully",
      error: false,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

export const getCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      res.status(404).json({
        message: "Car not found",
        error: true,
        data: undefined,
      });
      return;
    }
    res.status(200).json({
      message: "Car retrieved successfully",
      error: false,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

export const getCarsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categoty = await Category.findById(req.params.id).populate("cars");

    if (!categoty) {
      res.status(404).json({
        message: "Cars not found",
        error: true,
        data: undefined,
      });
    }
    res.status(200).json({
      message: "Cars retrieved successfully",
      error: false,
      data: categoty?.cars,
    });
  } catch (error) {
    next(error);
  }
};

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json({
      message: "Car created successfully",
      error: false,
      data: newCar,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!car) {
      res.status(404).json({
        message: "Car not found",
        error: true,
        data: undefined,
      });
    }
    res.status(200).json({
      message: "Car updated successfully",
      error: false,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      res.status(404).json({
        message: "Car not found",
        error: true,
        data: undefined,
      });
    }
    res.status(200).json({
      message: "Car deleted successfully",
      error: false,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

export const logicalDeleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { isActive: false }, // Establece la baja lógica
      { new: true }
    );

    if (!car) {
      res.status(404).json({
        message: "Car not found",
        error: true,
        data: undefined,
      });
      return; // Añadido para evitar que continúe la ejecución
    }

    res.status(200).json({
      message: "Car logically deleted successfully",
      error: false,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};
