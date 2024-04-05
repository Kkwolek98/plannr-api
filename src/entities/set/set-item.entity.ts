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
