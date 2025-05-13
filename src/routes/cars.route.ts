import { Router } from "express";
import { getCars, getCar, getCarsByCategory } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", getCars);
router.get("/:id", authMiddleware, getCar);
router.get("/category/:id", getCarsByCategory);

export default router;