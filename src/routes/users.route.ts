import { Router } from "express";
import { createUserValidation, deleteUserValidation, updateUserValidation } from "../validations";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/index";

const router = Router();
router.get("/", getUsers); 
router.get("/:id", getUserById);
router.post("/", createUserValidation, createUser);
router.patch("/:id", updateUserValidation, updateUser);
router.delete("/:id", deleteUserValidation , deleteUser);

export default router;
