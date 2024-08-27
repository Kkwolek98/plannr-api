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
