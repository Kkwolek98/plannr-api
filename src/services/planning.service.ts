import { dataSource } from "../core/data-source";
import { NewWorkoutPlanningDTO } from "../dtos/planning/new-workout-planning.DTO";
import ExerciseSet from "../entities/set/exercise-set.entity";
import SetItem from "../entities/set/set-item.entity";
import PlannedWorkout from "../entities/workout/planned-workout.entity";
import WorkoutTemplatesService from "./workout-templates.service";

export default class PlanningService {
	private readonly plannedWorkoutRepository = dataSource.getRepository(PlannedWorkout);
	private readonly exerciseSetRepository = dataSource.getRepository(ExerciseSet);
	private readonly setItemRepository = dataSource.getRepository(SetItem);

	private readonly workoutTemplateService = new WorkoutTemplatesService();

	public async planWorkout(newWorkoutPlanningDTO: NewWorkoutPlanningDTO): Promise<PlannedWorkout[]> {
		try {
			const template = await this.workoutTemplateService.getWorkoutTemplateById(newWorkoutPlanningDTO.template);

			if (!template) {
				throw "Invalid template";
			}

			const plannedWorkouts = newWorkoutPlanningDTO.dates.map((date) => {
				const plannedWorkout = new PlannedWorkout();
				plannedWorkout.date = date;
				plannedWorkout.template = template;
				plannedWorkout.name = template.name;
				plannedWorkout.tags = template.tags;
				plannedWorkout.owner = template.owner;
				return plannedWorkout;
			});

			const savedPlannedWorkouts = await Promise.all(
				plannedWorkouts.map((el) => this.plannedWorkoutRepository.save(el)),
			);

			await Promise.all(
				savedPlannedWorkouts.map(async (plannedWorkout) => {
					//TODO: work on differences
					plannedWorkout.sets = await Promise.all(
						template.sets.map((set) => {
							const overwrittenSet = newWorkoutPlanningDTO.differences.find(
								(difference) => difference.sort === set.sort,
							);
							return this.getExerciseSetCopy(overwrittenSet || set, plannedWorkout);
						}),
					);
				}),
			);
			return savedPlannedWorkouts;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	private async getExerciseSetCopy(
		targetExerciseSet: ExerciseSet,
		plannedWorkout: PlannedWorkout,
	): Promise<ExerciseSet> {
		const newSet = new ExerciseSet();

		newSet.description = targetExerciseSet.description;
		newSet.name = targetExerciseSet.name;
		newSet.rest = targetExerciseSet.rest;
		newSet.sort = targetExerciseSet.sort;
		newSet.workoutTemplate = null;
		newSet.plannedWorkout = plannedWorkout;

		const newSetItems = await Promise.all(
			targetExerciseSet.setItems.map(async (setItem) => {
				const newSetItem = await this.getSetItemCopy(setItem);
				newSetItem.exerciseSet = newSet;
				return newSetItem;
			}),
		);

		newSet.setItems = newSetItems;

		const saved = this.exerciseSetRepository.save(newSet);

		return saved;
	}

	private async getSetItemCopy(originalSetItem: SetItem): Promise<SetItem> {
		const newSetItem = new SetItem();

		newSetItem.details = originalSetItem.details;
		newSetItem.repExact = originalSetItem.repExact;
		newSetItem.repMax = originalSetItem.repMax;
		newSetItem.repMin = originalSetItem.repMin;
		newSetItem.repType = originalSetItem.repType;
		newSetItem.repWeight = originalSetItem.repWeight;
		newSetItem.rest = originalSetItem.rest;
		newSetItem.sort = originalSetItem.sort;

		const saved = await this.setItemRepository.save(newSetItem);

		return saved;
	}
}
