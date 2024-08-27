import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import WorkoutTemplate from "../workout/workout-template.entity";
import SetItem from "./set-item.entity";

@Entity()
export default class ExerciseSet {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Exclude()
	@ManyToOne(
		() => WorkoutTemplate,
		(workoutTemplate) => workoutTemplate.sets,
	)
	workoutTemplate: WorkoutTemplate;

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

	toJSON() {
		return instanceToPlain(this);
	}
}
