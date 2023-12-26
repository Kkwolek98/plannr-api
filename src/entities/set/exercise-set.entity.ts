import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Workout from "../workout/workout.entity";
import SetItem from "./set-item.entity";

@Entity()
export default class ExerciseSet {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(
		() => Workout,
		(workout) => workout.sets,
	)
	workout: Workout;

	@Column()
	name: string;

	@OneToMany(
		() => SetItem,
		(setItem) => setItem.exerciseSet,
		{ eager: true },
	)
	setItems: SetItem[];

	@Column()
	rest: number;
}
