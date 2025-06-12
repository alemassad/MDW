import { Router } from "express";
import { createUserValidation, deleteUserValidation, updateUserValidation } from "../validations";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/index";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", createUserValidation, createUser); // Registro público
router.patch("/:id", authMiddleware, updateUserValidation, updateUser);
router.delete("/:id", authMiddleware, deleteUserValidation, deleteUser);

export default router;
