import { Router } from "express";
import { formatMiddleware } from "../middlewares/users.middlewares";
import { createUserValidation, deleteUserValidation, updateUserValidation } from "../validations";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/index";

const router = Router();
router.get("/", getUsers);
router.get("/:name", getUsers);
router.get("/:id", getUser);
router.post("/", createUserValidation, createUser);
router.patch("/:id", updateUserValidation, updateUser);
router.delete("/:id", deleteUserValidation , deleteUser);

export default router;
