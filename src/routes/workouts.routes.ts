import { Router } from "express";
import WorkoutsController from "../controllers/workouts.controller";

const workoutsRoutes = Router();
const controller = new WorkoutsController();

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     description: Returns a list of all workouts.
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */

workoutsRoutes.get("/", (req, res) => controller.getAllWorkouts(req, res));

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     description: Returns a single workout based on the provided ID.
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the workout
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Workout not found
 *       500:
 *         description: Internal server error
 */
workoutsRoutes.get("/:id", (req, res) => controller.getWorkoutById(req, res));

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     description: Creates a new workout based on the request body.
 *     tags:
 *       - Workouts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 optional: true
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
workoutsRoutes.post("/", (req, res) => controller.createWorkout(req, res));

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Remove a workout by ID
 *     description: Deletes a workout based on the provided ID.
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the workout
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Workout deleted successfully
 *       404:
 *         description: Workout not found
 *       500:
 *         description: Internal server error
 */
workoutsRoutes.delete("/:id", (req, res) => controller.removeWorkout(req, res));

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Update a workout by ID
 *     description: Updates a workout based on the provided ID and request body.
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the workout
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
 *               description:
 *                 type: string
 *                 optional: true
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Workout not found
 *       500:
 *         description: Internal server error
 */
workoutsRoutes.put("/:id", (req, res) => controller.updateWorkout(req, res));

/**
 * @swagger
 * /workouts/{id}/sets:
 *   post:
 *     summary: Adds set to workout
 *     description: Creates a new set and adds it to workout.
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the workout
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
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
workoutsRoutes.post("/:id/sets", (req, res) => controller.addEmptySetToWorkout(req, res));

/**
 * @swagger
 * /workouts/{id}/sets/reorder:
 *   put:
 *     summary: Reorder sets in a workout
 *     description: This endpoint reorders the sets in a workout with the given ID
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the workout to reorder sets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               setId:
 *                 type: string
 *                 description: The ID of the set to move
 *               moveTo:
 *                 type: number
 *                 description: The new position of the set in the workout
 *     responses:
 *       '200':
 *         description: The sets were successfully reordered
 *       '400':
 *         description: Bad request, ID not provided or invalid data
 *       '404':
 *         description: Workout not found
 *       '500':
 *         description: Internal server error
 */
workoutsRoutes.put("/:id/sets/reorder", (req, res) => controller.reorderSet(req, res));

export default workoutsRoutes;
