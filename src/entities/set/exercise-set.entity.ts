import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Workout from "../workout/workout.entity";
import SetItem from "./set-item.entity";

@Entity()
export default class ExerciseSet {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Exclude()
	@ManyToOne(
		() => Workout,
		(workout) => workout.sets,
	)
	workout: Workout;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToMany(
		() => SetItem,
		(setItem) => setItem.exerciseSet,
		{ eager: true },
	)
	setItems: SetItem[];

	@Column({ nullable: true })
	rest: number;

	@Column()
	sort: number;
}
