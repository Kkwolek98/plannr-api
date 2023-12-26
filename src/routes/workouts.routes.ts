import { Router } from "express";
import WorkoutsController from "../controllers/workouts.controller";

const workoutsRoutes = Router();
const controller = new WorkoutsController();

workoutsRoutes.get("/", (req, res) => controller.getAllWorkouts(req, res));
workoutsRoutes.get("/:id", (req, res) => controller.getWorkoutById(req, res));
workoutsRoutes.post("/", (req, res) => controller.createWorkout(req, res));
workoutsRoutes.delete("/:id", (req, res) => controller.removeWorkout(req, res));
workoutsRoutes.put("/:id", (req, res) => controller.updateWorkout(req, res));

workoutsRoutes.post("/:id/add-set", (req, res) => controller.createWorkout(req, res));

export default workoutsRoutes;
