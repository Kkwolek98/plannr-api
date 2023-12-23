import { dataSource } from "../core/data-source";
import { PlannedExercise } from "../entities/planned-exercise.entity";

export default class PlannedExerciseService {
	private readonly plannedExerciseRepository = dataSource.getRepository(PlannedExercise);

	public async getAllPlannedExercises(): Promise<PlannedExercise[]> {
		try {
			return await this.plannedExerciseRepository.find();
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async getPlannedExerciseById(id: string): Promise<PlannedExercise | null> {
		try {
			return await this.plannedExerciseRepository.findOne({
				where: { id },
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async createPlannedExercise(plannedExercise: Omit<PlannedExercise, "id">): Promise<PlannedExercise> {
		// TODO: validate input

		try {
			return await this.plannedExerciseRepository.save(plannedExercise);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async removePlannedExercise(id: string): Promise<boolean> {
		try {
			const plannedExercise = await this.getPlannedExerciseById(id);

			if (plannedExercise) {
				await this.plannedExerciseRepository.remove(plannedExercise);
				return true;
			}
			return false;
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async updatePlannedExercise(
		id: string,
		updatedPlannedExercise: Partial<PlannedExercise>,
	): Promise<PlannedExercise> {
		// TODO: validate input

		try {
			const existingPlannedExercise = await this.getPlannedExerciseById(id);

			return await this.plannedExerciseRepository.save({
				...existingPlannedExercise,
				...updatedPlannedExercise,
			});
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}
}
