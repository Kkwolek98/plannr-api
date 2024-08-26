import WorkoutTemplate from "../../../entities/workout/workout.entity";

export type NewWorkoutDTO = Pick<WorkoutTemplate, "name" | "description">;
