import express, { Application } from "express";
import "reflect-metadata"
import logger from "./src/utils/logger";
import BASE_ROUTES from "./src/routes/routes";
import exerciseRoutes from "./src/routes/exercise.routes";

const app: Application = express();
const port = 8000;

app.use(logger);

app.use(BASE_ROUTES.exercises, exerciseRoutes);

app.listen(port, () => console.log('Server started on port: ' + port));
