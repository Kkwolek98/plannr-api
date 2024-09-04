import ExerciseSet from "../../entities/set/exercise-set.entity";

export type NewWorkoutPlanningDTO = {
	template: string;
	plannedWorkouts: {
		differences: ExerciseSet[];
		date: Date;
	}[];
};

/**
 * @swagger
 * components:
 *   schemas:
 *     NewWorkoutPlanningDTO:
 *       type: object
 *       required:
 *         - template
 *         - plannedWorkouts
 *       properties:
 *         template:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the workout template.
 *         plannedWorkouts:
 *           type: array
 *           description: Array of planned workouts with differences and dates.
 *           items:
 *             type: object
 *             properties:
 *               differences:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ExerciseSet'
 *                 description: List of differences between the template and the planned workout.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date for which the workout plan is applicable.
 */
