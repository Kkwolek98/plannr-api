import { DataSource } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import ExerciseSet from "../entities/set/exercise-set.entity";
import SetItem from "../entities/set/set-item.entity";
import Workout from "../entities/workout/workout.entity";

export const dataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 1337,
	username: "postgres",
	password: "",
	database: "plannr",
	entities: [Exercise, ExerciseSet, SetItem, Workout],
	migrations: ["../migrations/**.ts"],
	migrationsTableName: "migrations",
	synchronize: true,
	logging: false,
});

export function initializeDataSource() {
	dataSource
		.initialize()
		.then()
		.catch((error) => console.error(error));
}
