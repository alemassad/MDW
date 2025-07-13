import { Router } from "express";
import {
  getCars,
  getCar,
  getCarsByCategory,
  createCar,
  updateCar,
  deleteCar,
  logicalDeleteCar,
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
router.get("/category/:id", authMiddleware, getCarsByCategory);
router.post("/", authMiddleware, createCarValidation, createCar);
router.patch("/:id", authMiddleware, updateCarValidation, updateCar);
router.delete("/:id", authMiddleware, deleteCarValidation, deleteCar);
router.patch("/logical-delete/:id",authMiddleware, logicalDeleteCar);

export default router;
