import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { UserRoute } from "./app/modules/user/user.route";

app.use(express.json());
app.use(cors());

app.use("/api/users", UserRoute);
app.get("/", (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
