import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ExerciseSet from "../set/exercise-set.entity";
import LocalUser from "../user/local-user.entity";

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

	@Column("simple-array")
	tags: string[];

	@ManyToOne(
		() => LocalUser,
		(user) => user.id,
		{ eager: true },
	)
	owner: LocalUser;
}
