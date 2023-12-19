import express, { Application } from "express";
import "reflect-metadata"
import logger from "./src/core/logger";
import BASE_ROUTES from "./src/routes/routes";
import exerciseRoutes from "./src/routes/exercise.routes";
import { dataSource } from "./src/core/data-source";
import bodyParser from "body-parser";

const app: Application = express();
const port = 8000;

dataSource.initialize()
  .then()
  .catch((error) => console.error(error))

app.use(bodyParser.json());
app.use(logger);

app.use(BASE_ROUTES.exercises, exerciseRoutes);

app.listen(port, () => console.log('Server started on port: ' + port));
