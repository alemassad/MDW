import { Router } from "express";
import {
  getCars,
  getCar,
  getCarsByCategory,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createCarValidation,
  deleteCarValidation,
  updateCarValidation,
} from "../validations";

const router = Router();
router.get("/", getCars);
router.get("/:id", authMiddleware, getCar);
router.get("/category/:id", getCarsByCategory);
router.post("/", createCarValidation, createCar);
router.patch("/:id", updateCarValidation, updateCar);
router.delete("/:id", deleteCarValidation, deleteCar);

export default router;
