import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Application } from "express";
import session from "express-session";
import passport from "passport";
import { initializeJwtAuth } from "./auth/auth-jwt";
import { logger } from "./logger";
import { initalizeSwagger } from "./swagger";

dotenv.config();

export function initializeMiddleware(app: Application) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(logger);

	app.use(
		session({
			secret: process.env.SESSION_SECRET!,
			resave: false,
			saveUninitialized: false,
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());
	initializeJwtAuth();

	initalizeSwagger(app);
}
