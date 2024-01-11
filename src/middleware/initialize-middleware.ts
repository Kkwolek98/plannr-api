import bodyParser from "body-parser";
import cors from "cors";
import { Application } from "express";
import logger from "./logger";
import { initalizeSwagger } from "./swagger";

export function initializeMiddleware(app: Application) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(logger);
	initalizeSwagger(app);
}
