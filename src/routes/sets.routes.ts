import { Router } from "express";
import SetsController from "../controllers/sets.controller";

const setsRoutes = Router();
const controller = new SetsController();

setsRoutes.post("/:id/new-item", (req, res) => controller.addItemToSet(req, res));

export default setsRoutes;
