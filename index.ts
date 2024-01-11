import express, { Application } from "express";
import "reflect-metadata";
import { initializeDataSource } from "./src/core/data-source";
import { initializeMiddleware } from "./src/middleware/initialize-middleware";
import { registerRoutes } from "./src/routes/routes";

const app: Application = express();
const port = 8000;

initializeDataSource();
initializeMiddleware(app);
registerRoutes(app);

app.listen(port, () => console.log(`Server started on port: ${port}`));
