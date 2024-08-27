import WorkoutTemplate from "../../../entities/workout/workout-template.entity";

export type NewWorkoutDTO = Pick<WorkoutTemplate, "name" | "description">;
