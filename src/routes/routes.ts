import { Application } from "express";
import exerciseRoutes from "./exercise.routes";
import setsRoutes from "./sets.routes";
import workoutsRoutes from "./workouts.routes";

export function registerRoutes(app: Application) {
	app.use("/exercises", exerciseRoutes);
	app.use("/workouts", workoutsRoutes);
	app.use("/sets", setsRoutes);
}
