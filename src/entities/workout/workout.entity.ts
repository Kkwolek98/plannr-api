import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ExerciseSet from "../set/exercise-set.entity";

@Entity()
export default class Workout {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToMany(
		() => ExerciseSet,
		(exerciseSet) => exerciseSet.workout,
		{ eager: true },
	)
	sets: ExerciseSet[];

	@Column("simple-array", { nullable: true })
	tags: string[];
}
