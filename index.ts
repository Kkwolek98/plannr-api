import bodyParser from "body-parser";
import express, { Application } from "express";
import "reflect-metadata";
import { dataSource } from "./src/core/data-source";
import logger from "./src/core/logger";
import exerciseRoutes from "./src/routes/exercise.routes";
import BASE_ROUTES from "./src/routes/routes";
import workoutsRoutes from "./src/routes/workouts.routes";

const app: Application = express();
const port = 8000;

dataSource
	.initialize()
	.then()
	.catch((error) => console.error(error));

app.use(bodyParser.json());
app.use(logger);

app.use(BASE_ROUTES.exercises, exerciseRoutes);
app.use(BASE_ROUTES.workouts, workoutsRoutes);

app.listen(port, () => console.log(`Server started on port: ${port}`));
