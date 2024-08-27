import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SetItem from "../set/set-item.entity";
import PlannedWorkout from "./planned-workout.entity";

@Entity()
export default class ExerciseDifference {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: true })
	comment: string;

	@ManyToOne(() => SetItem)
	newValue: SetItem;

	@ManyToOne(
		() => PlannedWorkout,
		(plannedWorkout) => plannedWorkout.differences,
	)
	plannedWorkout: PlannedWorkout;
}
