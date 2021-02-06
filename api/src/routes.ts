import { Router } from "express";
import { Auth } from "./controllers/Auth";
import Register from "./controllers/Register";
import { Me } from "./controllers/Me";
import { Logout } from "./controllers/Logout";
import {
  CreateIdea,
  GetAllIdeas,
  GetIdea,
  EditIdea,
  DeleteIdea,
} from "./controllers/Idea";
import { isAuth } from "./middlewares/isAuth";

const router: Router = Router();

router.use("/register", Register);

// router.post("/auth", Auth);

// router.post("/logout", Logout);

// router.get("/me", isAuth, Me);

// router.post("/ideas", isAuth, CreateIdea);

// router.get("/ideas", isAuth, GetAllIdeas);

// router.get("/ideas/:ideaId", isAuth, GetIdea);

// router.put("/ideas", isAuth, EditIdea);

// router.delete("/ideas/:ideaId", isAuth, DeleteIdea);

export default router;
