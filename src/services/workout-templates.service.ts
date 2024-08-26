import { dataSource } from "../core/data-source";
import { NewWorkoutDTO } from "../core/types/workout/new-workout-DTO";
import { ReorderSetsDTO } from "../dtos/workouts/reorder-sets-DTO";
import WorkoutTemplate from "../entities/workout/workout.entity";
import SetsService from "./sets.service";

export default class WorkoutTemplatesService {
	private readonly setsService = new SetsService();
	private readonly workoutTemplatesRepository = dataSource.getRepository(WorkoutTemplate);

	public async getAllWorkoutTemplates(): Promise<WorkoutTemplate[]> {
		try {
			return await this.workoutTemplatesRepository.find();
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async getWorkoutTemplateById(id: string): Promise<WorkoutTemplate | null> {
		try {
			return await this.workoutTemplatesRepository.findOne({
				where: { id },
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async createWorkoutTemplate(newWorkout: NewWorkoutDTO): Promise<WorkoutTemplate> {
		//TODO: Validate input

		try {
			return await this.workoutTemplatesRepository.save(newWorkout);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async removeWorkoutTemplate(id: string) {
		try {
			const workout = await this.getWorkoutTemplateById(id);

			if (workout) {
				await this.workoutTemplatesRepository.remove(workout);
				return true;
			}
			return false;
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async updateWorkoutTemplate(
		id: string,
		updatedWorkout: Partial<WorkoutTemplate>,
	): Promise<WorkoutTemplate> {
		// TODO: validate input

		try {
			const existingWorkout = await this.getWorkoutTemplateById(id);

			return await this.workoutTemplatesRepository.save({
				...existingWorkout,
				...updatedWorkout,
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async addEmptySetToWorkoutTemplate(id: string, setName: string): Promise<WorkoutTemplate | null> {
		// TODO: Validate input

		try {
			const workout = await this.getWorkoutTemplateById(id);

			if (!workout) {
				return null;
			}

			const newSet = await this.setsService.createNewSet(workout, setName);
			workout.sets.push(newSet);

			return await this.workoutTemplatesRepository.save(workout);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async reorderSet(workoutTemplateId: string, reorderDTO: ReorderSetsDTO): Promise<WorkoutTemplate | null> {
		try {
			const workoutTemplate = await this.getWorkoutTemplateById(workoutTemplateId);

			if (!workoutTemplate) {
				return null;
			}

			const currentSet = workoutTemplate.sets.find((set) => set.id === reorderDTO.setId);
			const swapSet = workoutTemplate.sets.find((set) => set.sort === reorderDTO.moveTo);

			if (!currentSet || !swapSet) {
				return null;
			}

			const currentSetSort = currentSet.sort;
			const swapSetSort = swapSet.sort;

			currentSet.sort = swapSetSort;
			swapSet.sort = currentSetSort;

			return await this.workoutTemplatesRepository.save(workoutTemplate);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}
}
