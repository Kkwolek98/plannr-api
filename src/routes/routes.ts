import { Application } from "express";
import passport from "passport";
import authRoutes from "./auth.routes";
import exerciseRoutes from "./exercise.routes";
import setsRoutes from "./sets.routes";
import userRoutes from "./user.routes";
import workoutTemplatesRoutes from "./workout-templates.routes";

export function registerRoutes(app: Application) {
	app.use("/auth", authRoutes);

	app.use("/exercises", passport.authenticate("jwt", { session: false }), exerciseRoutes);
	app.use("/workout-templates", passport.authenticate("jwt", { session: false }), workoutTemplatesRoutes);
	app.use("/sets", passport.authenticate("jwt", { session: false }), setsRoutes);
	app.use("/user", passport.authenticate("jwt", { session: false }), userRoutes);
}
