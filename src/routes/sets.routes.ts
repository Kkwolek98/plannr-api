import { Router } from "express";
import SetsController from "../controllers/sets.controller";

const setsRoutes = Router();
const controller = new SetsController();

setsRoutes.get("/", (req, res) => controller.getAllSets(req, res));
setsRoutes.get("/:id", (req, res) => controller.getSetById(req, res));
setsRoutes.post("/", (req, res) => controller.createSet(req, res));
setsRoutes.delete("/:id", (req, res) => controller.removeSet(req, res));
setsRoutes.put("/:id", (req, res) => controller.updateSet(req, res));

export default setsRoutes;
