import { dataSource } from "../core/data-source";
import { NewWorkoutDTO } from "../core/types/workout/new-workout-DTO";
import { ReorderSetsDTO } from "../dtos/workouts/reorder-sets-DTO";
import Workout from "../entities/workout/workout.entity";
import SetsService from "./sets.service";

export default class WorkoutsService {
	private readonly setsService = new SetsService();
	private readonly workoutsRepository = dataSource.getRepository(Workout);

	public async getAllWorkouts(): Promise<Workout[]> {
		try {
			return await this.workoutsRepository.find();
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async getWorkoutById(id: string): Promise<Workout | null> {
		try {
			return await this.workoutsRepository.findOne({
				where: { id },
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async createWorkout(newWorkout: NewWorkoutDTO): Promise<Workout> {
		//TODO: Validate input

		try {
			return await this.workoutsRepository.save(newWorkout);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async removeWorkout(id: string) {
		try {
			const workout = await this.getWorkoutById(id);

			if (workout) {
				await this.workoutsRepository.remove(workout);
				return true;
			}
			return false;
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async updateWorkout(id: string, updatedWorkout: Partial<Workout>): Promise<Workout> {
		// TODO: validate input

		try {
			const existingWorkout = await this.getWorkoutById(id);

			return await this.workoutsRepository.save({
				...existingWorkout,
				...updatedWorkout,
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async addEmptySetToWorkout(id: string, setName: string): Promise<Workout | null> {
		// TODO: Validate input

		try {
			const workout = await this.getWorkoutById(id);

			if (!workout) {
				return null;
			}

			const newSet = await this.setsService.createNewSet(workout, setName);
			workout.sets.push(newSet);

			return await this.workoutsRepository.save(workout);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async reorderSet(workoutId: string, reorderDTO: ReorderSetsDTO): Promise<Workout | null> {
		try {
			const workout = await this.getWorkoutById(workoutId);

			if (!workout) {
				return null;
			}

			const currentSet = workout.sets.find((set) => set.id === reorderDTO.setId);
			const swapSet = workout.sets.find((set) => set.sort === reorderDTO.moveTo);

			if (!currentSet || !swapSet) {
				return null;
			}

			const currentSetSort = currentSet.sort;
			const swapSetSort = swapSet.sort;

			currentSet.sort = swapSetSort;
			swapSet.sort = currentSetSort;

			return await this.workoutsRepository.save(workout);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}
}
