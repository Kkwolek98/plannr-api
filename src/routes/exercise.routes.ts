import { Router } from "express";
import ExerciseController from "../controllers/exercise.controller";

const exerciseRoutes = Router();
const controller = new ExerciseController();

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises
 *     description: Returns a list of all exercises.
 *     tags:
 *       - Exercises
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
exerciseRoutes.get("/", (req, res) => controller.getAllExercises(req, res));

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     description: Returns a single exercise based on the provided ID.
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exercise
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */
exerciseRoutes.get("/:id", (req, res) => controller.getExerciseById(req, res));

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create a new exercise
 *     description: Creates a new exercise based on the request body.
 *     tags:
 *       - Exercises
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the exercise
 *               description:
 *                 type: string
 *                 description: Description of the exercise (optional)
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of video URLs related to the exercise
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of exercise tags
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
exerciseRoutes.post("/", (req, res) => controller.createExercise(req, res));

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Remove an exercise by ID
 *     description: Deletes an exercise based on the provided ID.
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exercise
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Exercise deleted successfully
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */
exerciseRoutes.delete("/:id", (req, res) =>
  controller.removeExercise(req, res)
);

/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Update an exercise by ID
 *     description: Updates an exercise based on the provided ID and request body.
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exercise
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the exercise
 *               description:
 *                 type: string
 *                 description: Description of the exercise (optional)
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of video URLs related to the exercise
 *     responses:
 *       200:
 *         description: Exercise updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */
exerciseRoutes.put("/:id", (req, res) => controller.updateExercise(req, res));

export default exerciseRoutes;
