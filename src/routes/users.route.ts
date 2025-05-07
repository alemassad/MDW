import { Router } from "express";
import { formatMiddleware } from "../middlewares/users.middlewares";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/index";

const router = Router();

router.get("/:name", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
