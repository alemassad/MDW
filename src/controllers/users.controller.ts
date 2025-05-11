import { NextFunction, Request, Response } from "express";
import { User } from "../models";

export const controller = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
};

interface UserBody {
  name: string;
  lastname: string;
  birthdate: string;
  email: string;
  isAdmin?: boolean;
}


export const createUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const formatedDate = new Date(req.body.birthdate);
  try {
    const newUser = await User.create({
      ...req.body,
      birthdate: formatedDate,
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

export const getUsers = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: "alguien" });
};
export const getUser = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
};
export const updateUser = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
};
export const deleteUser = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
};
