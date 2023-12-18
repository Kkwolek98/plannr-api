import { Router } from "express";
import ExerciseController from "../controllers/exercise.controller";

const exerciseRoutes = Router();
const controller = new ExerciseController();

exerciseRoutes.get('/', controller.getAllExercises);
exerciseRoutes.get('/:id', controller.getExerciseById);
exerciseRoutes.post('/', controller.createExercise);
exerciseRoutes.delete('/:id', controller.createExercise);
exerciseRoutes.put('/:id', controller.updateExercise);

export default exerciseRoutes;