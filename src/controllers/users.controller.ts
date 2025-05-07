import { Request, Response } from "express";

export const controller = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
};
export const createUser = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ user: name });
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