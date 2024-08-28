import { dataSource } from "../core/data-source";
import { NewWorkoutPlanningDTO } from "../dtos/planning/new-workout-planning.DTO";
import ExerciseDifference from "../entities/workout/exercise-difference.entity";
import PlannedWorkout from "../entities/workout/planned-workout.entity";

export default class PlanningService {
	private readonly plannedWorkoutRepository = dataSource.getRepository(PlannedWorkout);
	private readonly exerciseDifferenceRepository = dataSource.getRepository(ExerciseDifference);

	public async planWorkout(newWorkoutPlanningDTO: NewWorkoutPlanningDTO): Promise<PlannedWorkout[]> {
		const plannedWorkouts = newWorkoutPlanningDTO.dates.map((date) => {
			const plannedWorkout = new PlannedWorkout();
			plannedWorkout.date = date;
			plannedWorkout.template = newWorkoutPlanningDTO.template;
			plannedWorkout.differences = newWorkoutPlanningDTO.differences;

			return plannedWorkout;
		});
		try {
			const savedPlannedWorkouts = await Promise.all(
				plannedWorkouts.map((el) => this.plannedWorkoutRepository.save(el)),
			);
			return savedPlannedWorkouts;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
