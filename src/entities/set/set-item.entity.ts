import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "../exercise.entity";
import ExerciseSet from "./exercise-set.entity";

@Entity()
export default class SetItem {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(
		() => ExerciseSet,
		(exerciseSet) => exerciseSet.setItems,
		{ onDelete: "CASCADE" },
	)
	exerciseSet: ExerciseSet;

	@ManyToOne(() => Exercise, { eager: true })
	details: Exercise;

	@Column({ name: "rep_min", nullable: true })
	repMin: number;

	@Column({ name: "rep_max", nullable: true })
	repMax: number;

	@Column({ name: "rep_exact", nullable: true })
	repExact: number;

	@Column({ name: "rep_weight", nullable: true, type: "float" })
	repWeight: number;

	@Column({ name: "rep_type", nullable: true })
	repType: string; // "kg" | "lb" | "RPE" | "min"

	@Column()
	sort: number;

	@Column({ nullable: true, type: "float" })
	rest: number;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     SetItem:
 *       type: object
 *       required:
 *         - id
 *         - exerciseSet
 *         - details
 *         - sort
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         exerciseSet:
 *           $ref: '#/components/schemas/ExerciseSet'
 *         details:
 *           $ref: '#/components/schemas/Exercise'
 *         repMin:
 *           type: integer
 *           nullable: true
 *         repMax:
 *           type: integer
 *           nullable: true
 *         repExact:
 *           type: integer
 *           nullable: true
 *         repWeight:
 *           type: number
 *           format: float
 *           nullable: true
 *         repType:
 *           type: string
 *           nullable: true
 *           enum:
 *             - kg
 *             - lb
 *             - RPE
 *             - min
 *         sort:
 *           type: integer
 *         rest:
 *           type: number
 *           format: float
 *           nullable: true
 */
