import { DataSource } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import { PlannedExercise } from "../entities/planned-exercise.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 1337,
  username: "postgres",
  password: "",
  database: "plannr",
  entities: [Exercise, PlannedExercise],
  migrations: ["../migrations/**.ts"],
  migrationsTableName: "migrations",
  synchronize: true,
  logging: false,
});