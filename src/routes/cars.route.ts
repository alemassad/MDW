import { Router, Request, Response, NextFunction } from "express";
import { getCars, getCar, getCarsByCategory } from "../controllers";

const router = Router();
router.get("/", getCars);
router.get("/:id", getCar);
router.get("/category/:id", getCarsByCategory);

export default router;