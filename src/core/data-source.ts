import { DataSource } from "typeorm";
import { Exercise } from "../entities/exercise.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 1337,
  username: "postgres",
  password: "",
  database: "plannr",
  entities: [Exercise],
  migrations: ["../migrations/**.ts"],
  migrationsTableName: "migrations",
  synchronize: true,
  logging: false,
});