import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ExerciseSet from "../set/exercise-set.entity";
import LocalUser from "../user/local-user.entity";

@Entity()
export default class WorkoutTemplate {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToMany(
		() => ExerciseSet,
		(exerciseSet) => exerciseSet.workoutTemplate,
		{ eager: true },
	)
	sets: ExerciseSet[];

	@Column("simple-array")
	tags: string[];

	@ManyToOne(
		() => LocalUser,
		(user) => user.id,
		{ eager: true },
	)
	owner: LocalUser;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkoutTemplate:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - sets
 *         - tags
 *         - owner
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         sets:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseSet'
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         owner:
 *           $ref: '#/components/schemas/LocalUser'
 */
