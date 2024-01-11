import { Application } from "express";
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition: OAS3Definition = {
	openapi: "3.0.0",
	info: {
		title: "Plannr",
		version: "0.0",
	},
};

const swaggerOptions: OAS3Options = {
	swaggerDefinition,
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function initalizeSwagger(app: Application) {
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
