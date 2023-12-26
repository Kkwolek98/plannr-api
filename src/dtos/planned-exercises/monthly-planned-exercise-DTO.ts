import { PlannedExercise } from "../../entities/planned-exercise.entity";

export default class MonthlyPlannedExerciseDTO {
	plannedExercise: Omit<PlannedExercise, "id" | "date">;
	month: number;
}
