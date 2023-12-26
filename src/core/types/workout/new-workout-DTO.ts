import Workout from "../../../entities/workout/workout.entity";

export type NewWorkoutDTO = Pick<Workout, "name" | "description">;
