import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ExerciseSet from "../set/exercise-set.entity";
import LocalUser from "../user/local-user.entity";
import WorkoutTemplate from "./workout-template.entity";

@Entity()
export default class PlannedWorkout {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Exclude()
	@ManyToOne(() => WorkoutTemplate)
	template: WorkoutTemplate;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Exclude()
	@OneToMany(
		() => ExerciseSet,
		(exerciseSet) => exerciseSet.plannedWorkout,
	)
	sets: ExerciseSet[];

	@Column("simple-array")
	tags: string[];

	@ManyToOne(
		() => LocalUser,
		(user) => user.id,
	)
	owner: LocalUser;

	// log progress

	@Column({ type: "date" })
	date: Date;

	toJSON() {
		const plain = instanceToPlain(this);
		plain.sets = this.sets.map((set) => set.id);
		return plain;
	}
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
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         sets:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         owner:
 *           $ref: '#/components/schemas/LocalUser'
 *         date:
 *           type: string
 *           format: date
 */
