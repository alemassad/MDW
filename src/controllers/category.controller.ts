import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category.model";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await Category.find().populate("cars");
    res.status(200).json({
      message: "Categories retrieved successfully",
      error: false,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id).populate("cars");
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        error: true,
        data: undefined,
      });
      return;
    }
    res.status(200).json({
      message: "Category retrieved successfully",
      error: false,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      message: "Category created successfully",
      error: false,
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      res.status(404).json({
        message: "Category not found",
        error: true,
        data: undefined,
      });
      return;
    }
    res.status(200).json({
      message: "Category updated successfully",
      error: false,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      res.status(404).json({
        message: "Category not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "Category deleted successfully",
      error: false,
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const logicalDeleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!category) {
      res.status(404).json({
        message: "Category not found",
        error: true,
        data: undefined,
      });
      return;
    }

    res.status(200).json({
      message: "Category logically deleted successfully",
      error: false,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};