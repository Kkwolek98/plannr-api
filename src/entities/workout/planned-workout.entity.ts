import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ExerciseDifference from "./exercise-difference.entity";
import WorkoutTemplate from "./workout-template.entity";

@Entity()
export default class PlannedWorkout {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => WorkoutTemplate, { eager: true })
	template: WorkoutTemplate;

	@OneToMany(
		() => ExerciseDifference,
		(difference) => difference.plannedWorkout,
	)
	differences: ExerciseDifference[];

	@Column({ type: "date" })
	date: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PlannedWorkout:
 *       type: object
 *       required:
 *         - id
 *         - template
 *         - differences
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         template:
 *           $ref: '#/components/schemas/WorkoutTemplate'
 *         differences:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseDifference'
 *         date:
 *           type: string
 *           format: date
 */
