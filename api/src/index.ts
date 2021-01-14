import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { Auth } from "./routes/Auth";
import { Register } from "./routes/Register";
import { Me } from "./routes/Me";
import { Logout } from "./routes/Logout";
import {
  CreateIdea,
  GetAllIdeas,
  GetIdea,
  EditIdea,
  DeleteIdea,
} from "./routes/Idea";
import { isAuth } from "./middlewares/isAuth";

require("dotenv").config();

(async () => {
  await createConnection();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.locals.JWT_SECRET = process.env.JWT_SECRET;

  app.post("/register", Register);

  app.post("/auth", Auth);

  app.post("/logout", Logout);

  app.get("/me", isAuth, Me);

  app.post("/ideas", isAuth, CreateIdea);

  app.get("/ideas", isAuth, GetAllIdeas);

  app.get("/ideas/:ideaId", isAuth, GetIdea);

  app.put("/ideas", isAuth, EditIdea);

  app.delete("/ideas/:ideaId", isAuth, DeleteIdea);

  app.listen(3002, () => {
    console.log(`listening on 3002`);
  });
})();
