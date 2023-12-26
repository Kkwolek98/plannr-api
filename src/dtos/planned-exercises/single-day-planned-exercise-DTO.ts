import { PlannedExercise } from "../../entities/planned-exercise.entity";

export type SingleDayPlannedExerciseDTO = Omit<PlannedExercise, "id">;
