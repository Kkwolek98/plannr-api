import ExerciseDifference from "../../entities/workout/exercise-difference.entity";
import WorkoutTemplate from "../../entities/workout/workout-template.entity";

export type NewWorkoutPlanningDTO = {
	template: WorkoutTemplate;
	differences: ExerciseDifference[];
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
 *           $ref: '#/components/schemas/WorkoutTemplate'
 *           description: The workout template to be used.
 *         differences:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseDifference'
 *           description: List of differences between the template and the new workout.
 *         dates:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *           description: Array of dates for which the workout plan is applicable.
 */
