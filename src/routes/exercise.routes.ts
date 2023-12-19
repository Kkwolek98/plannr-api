import { Router } from "express";
import ExerciseController from "../controllers/exercise.controller";

const exerciseRoutes = Router();
const controller = new ExerciseController();

exerciseRoutes.get('/', (req, res) => controller.getAllExercises(req, res));
exerciseRoutes.get('/:id', (req, res) => controller.getExerciseById(req, res));
exerciseRoutes.post('/', (req, res) => controller.createExercise(req, res));
exerciseRoutes.delete('/:id', (req, res) => controller.removeExercise(req, res));
exerciseRoutes.put('/:id', (req, res) => controller.updateExercise(req, res));


export default exerciseRoutes;