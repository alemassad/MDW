import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  logicalDeleteCategory,
} from "../controllers";
import {
  createCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
} from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getCategories);
router.get("/:id", authMiddleware, getCategory);
router.post("/", authMiddleware, createCategoryValidation, createCategory);
router.patch("/:id", authMiddleware, updateCategoryValidation, updateCategory);
router.delete("/:id", authMiddleware, deleteCategoryValidation, deleteCategory);
router.patch("/logical-delete/:id", authMiddleware, logicalDeleteCategory); 

export default router;