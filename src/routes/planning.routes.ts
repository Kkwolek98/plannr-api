import { Router } from "express";
import PlanningController from "../controllers/planning.controller";

const planningRoutes = Router();
const controller = new PlanningController();

/**
 * @swagger
 * /planned-workout:
 *   post:
 *     summary: Plan a new workout
 *     description: This endpoint allows you to plan a new workout based on a workout template.
 *     tags:
 *       - PlannedWorkouts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewWorkoutPlanningDTO'
 *     responses:
 *       200:
 *         description: The planned workouts were successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlannedWorkout'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */
planningRoutes.post("/", (req, res) => controller.planWorkout(req, res));

export default planningRoutes;
