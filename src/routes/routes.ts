import { Application } from "express";
import passport from "passport";
import authRoutes from "./auth.routes";
import exerciseRoutes from "./exercise.routes";
import setsRoutes from "./sets.routes";
import workoutsRoutes from "./workouts.routes";

export function registerRoutes(app: Application) {
	app.use("/auth", authRoutes);

	app.use("/exercises", passport.authenticate("jwt", { session: false }), exerciseRoutes);
	app.use("/workouts", passport.authenticate("jwt", { session: false }), workoutsRoutes);
	app.use("/sets", passport.authenticate("jwt", { session: false }), setsRoutes);
}
