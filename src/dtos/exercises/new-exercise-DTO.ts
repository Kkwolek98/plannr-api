import { Exercise } from "../../entities/exercise.entity";

export type NewExerciseDTO = Omit<Exercise, "id">;
