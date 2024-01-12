import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRoutes = Router();
const controller = new AuthController();

authRoutes.post("/login", (req, res) => controller.loginLocalUser(req, res));
authRoutes.post("/register", (req, res) => controller.registerLocalUser(req, res));

export default authRoutes;
