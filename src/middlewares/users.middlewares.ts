import { NextFunction, Request, Response } from "express";

export const formatMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.params.name = req.params.name.toUpperCase();
    next();
};
