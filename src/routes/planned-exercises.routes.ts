import { Router } from "express";
import ExerciseController from "../controllers/exercise.controller";

const plannedExerciseRoutes = Router();
const controller = new ExerciseController();

plannedExerciseRoutes.get('/', (req, res) => controller.getAllExercises(req, res));
plannedExerciseRoutes.get('/:id', (req, res) => controller.getExerciseById(req, res));
plannedExerciseRoutes.post('/', (req, res) => controller.createExercise(req, res));
plannedExerciseRoutes.delete('/:id', (req, res) => controller.removeExercise(req, res));
plannedExerciseRoutes.put('/:id', (req, res) => controller.updateExercise(req, res));


export default plannedExerciseRoutes;