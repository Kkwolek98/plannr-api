import dotenv from "dotenv";
import express, { Application } from "express";
import "reflect-metadata";
import { initializeDataSource } from "./src/core/data-source";
import { initializeMiddleware } from "./src/middleware/initialize-middleware";
import { registerRoutes } from "./src/routes/routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

initializeDataSource();
initializeMiddleware(app);
registerRoutes(app);

app.listen(port, () => console.log(`Server started on port: ${port}`));
