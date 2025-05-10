import { Router } from "express";
import usersRouter from "./users.route"
import carsRouter from "./cars.route"

const router = Router();

router.use("/users", usersRouter)
router.use("/cars", carsRouter)

export default router;
