import { Router } from "express";
import Auth from "./controllers/Auth";
import Register from "./controllers/Register";
import Me from "./controllers/Me";
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

router.use("/auth", Auth);

// router.use("/logout", Logout);

router.use("/me", isAuth, Me);

router.use("/ideas", isAuth, CreateIdea);

// router.get("/ideas", isAuth, GetAllIdeas);

// router.get("/ideas/:ideaId", isAuth, GetIdea);

// router.put("/ideas", isAuth, EditIdea);

// router.delete("/ideas/:ideaId", isAuth, DeleteIdea);

export default router;
