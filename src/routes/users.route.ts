import { Router } from "express";
import { createUserValidation, deleteUserValidation, updateUserValidation } from "../validations";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUsers,
  logicalDeleteUser,
  updateUser,
} from "../controllers/index";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", authMiddleware, getUserById);
router.post("/", createUserValidation, createUser); 
router.patch("/:id", authMiddleware, updateUserValidation, updateUser);
router.delete("/:id", authMiddleware, deleteUserValidation, deleteUser);
router.patch("/logical-delete/:id", authMiddleware, logicalDeleteUser);

export default router;
