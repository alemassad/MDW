import express, { Request, Response } from "express";
import router from "./routes/index";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hola campeon");
});

app.use(router);

app.listen(port, () => {
  console.log(`App escuchando en el puerto ${port}`);
});

