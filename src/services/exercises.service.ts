import { dataSource } from "../core/data-source";
import { Exercise } from "../entities/exercise.entity";

export default class ExerciseService {
	private readonly exerciseRepository = dataSource.getRepository(Exercise);

	public async getAllExercises(): Promise<Exercise[]> {
		try {
			return await this.exerciseRepository.find();
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async getExerciseById(id: string): Promise<Exercise | null> {
		try {
			return await this.exerciseRepository.findOne({
				where: { id },
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async createExercise(exercise: Omit<Exercise, "id">): Promise<Exercise> {
		// TODO: validate input

		try {
			return await this.exerciseRepository.save(exercise);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async removeExercise(id: string): Promise<boolean> {
		try {
			const exercise = await this.getExerciseById(id);

			if (exercise) {
				await this.exerciseRepository.remove(exercise);
				return true;
			}
			return false;
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async updateExercise(id: string, updatedExercise: Partial<Exercise>): Promise<Exercise> {
		// TODO: validate input

		try {
			const existingExercise = await this.getExerciseById(id);

			return await this.exerciseRepository.save({
				...existingExercise,
				...updatedExercise,
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}
}
