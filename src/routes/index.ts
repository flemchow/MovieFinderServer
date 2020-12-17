import { Router } from "express";
import { register } from "./register";
import { login } from "./login";

export const routes = Router();

routes.use("/register", register);
routes.use("/login", login);
