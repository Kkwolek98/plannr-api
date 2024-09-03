import ExerciseSet from "../../entities/set/exercise-set.entity";

export type NewWorkoutPlanningDTO = {
	template: string;
	differences: ExerciseSet[];
	dates: Date[];
};

/**
 * @swagger
 * components:
 *   schemas:
 *     NewWorkoutPlanningDTO:
 *       type: object
 *       required:
 *         - template
 *         - differences
 *         - dates
 *       properties:
 *         template:
 *           type: string
 *           format: uuid
 *         differences:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseSet'
 *           description: List of differences between the template and the new workout.
 *         dates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *           description: Array of dates for which the workout plan is applicable.
 */
