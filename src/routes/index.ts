import { Router } from "express";
import usersRouter from "./users.route"
import carsRouter from "./cars.route"
import categoryRouter from "./category.route"

const router = Router();

router.use("/users", usersRouter)
router.use("/cars", carsRouter)
router.use("/categories", categoryRouter)

export default router;
