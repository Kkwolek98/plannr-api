import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import ExerciseSet from "../entities/set/exercise-set.entity";
import SetItem from "../entities/set/set-item.entity";
import LocalUser from "../entities/user/local-user.entity";
import Workout from "../entities/workout/workout.entity";

dotenv.config();

export const dataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1337,
	username: "postgres",
	password: process.env.DB_PASSWORD || "",
	database: "plannr",
	entities: [Exercise, ExerciseSet, SetItem, Workout, LocalUser],
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
