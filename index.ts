import bodyParser from "body-parser";
import express, { Application } from "express";
import "reflect-metadata";
import { dataSource } from "./src/core/data-source";
import logger from "./src/core/logger";
import { initSwagger } from "./src/core/swagger";
import exerciseRoutes from "./src/routes/exercise.routes";
import workoutsRoutes from "./src/routes/workouts.routes";

const app: Application = express();
const port = 8000;

dataSource
	.initialize()
	.then()
	.catch((error) => console.error(error));

app.use(bodyParser.json());
app.use(logger);
initSwagger(app);

app.use("/exercises", exerciseRoutes);
app.use("/workouts", workoutsRoutes);

app.listen(port, () => console.log(`Server started on port: ${port}`));
