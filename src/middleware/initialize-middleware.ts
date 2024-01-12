import bodyParser from "body-parser";
import cors from "cors";
import { Application } from "express";
import passport from "passport";
import { initializeJwtAuth } from "./auth/auth-jwt";
import { initializeLocalAuth } from "./auth/local-auth";
import { logger } from "./logger";
import { initalizeSwagger } from "./swagger";

export function initializeMiddleware(app: Application) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(logger);

	app.use(passport.initialize());
	app.use(passport.session());

	initializeLocalAuth();
	initializeJwtAuth();

	initalizeSwagger(app);
}
