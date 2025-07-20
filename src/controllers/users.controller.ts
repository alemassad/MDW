import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import firebaseApp from "../config/firebase";

export const controller = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { password, ...restBody } = req.body;
  const formatedDate = new Date(req.body.birthdate);
  try {
    const { uid } = await firebaseApp.auth().createUser({
      email: req.body.email,
      password,
    });
    const newUser = await User.create({
      ...restBody,
      firebaseUid: uid,
      birthdate: formatedDate,
      isActive: true,
    });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
      return;
    }

    res.status(200).json({
      message: "User retrieved successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.query;
    let users;
    if (name) {
      users = await User.find({
        name: { $regex: new RegExp(name as string, "i") },
      });
    } else {
      users = await User.find();
    }
    res.status(200).json({
      message: "Users retrieved successfully",
      error: false,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
      return;
    }
    res.status(200).json({
      message: "User retrieved successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const birthdate = req.body.birthdate ? new Date(req.body.birthdate) : undefined;
  try {
    const updateData = { ...req.body };
    if (birthdate) updateData.birthdate = birthdate;

    // Busca el usuario actual
    const userBefore = await User.findById(req.params.id);
    if (!userBefore) {
      res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
      return;
    }    
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      data: user,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logicalDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
      return;
    }

    res.status(200).json({
      message: "User logically deleted successfully",
      error: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};