import { Router } from "express";
import { CreateUser } from "../controllers/User/CreateUser";
const userRoutes = Router();

const User = new CreateUser();

//login User
userRoutes.post("/register-user", User.create);

export { userRoutes };
