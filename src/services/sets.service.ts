import { dataSource } from "../core/data-source";
import ExerciseSet from "../entities/set/exercise-set.entity";
import SetItem from "../entities/set/set-item.entity";
import Workout from "../entities/workout/workout.entity";

export default class SetsService {
	private readonly setsRepository = dataSource.getRepository(ExerciseSet);
	private readonly setItemsRepository = dataSource.getRepository(SetItem);

	public async addItemToSet(id: string, setItem: Partial<SetItem>) {
		// TODO: Validate input
		try {
			const set = await this.setsRepository.findOne({ where: { id } });

			if (!set) {
				return null;
			}

			const newSetItem = await this.setItemsRepository.save(setItem);

			set.setItems.push(newSetItem);

			return await this.setsRepository.save(set);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async createNewSet(workout: Workout, setName: string): Promise<ExerciseSet> {
		try {
			const newSet = new ExerciseSet();
			newSet.workout = workout;
			newSet.name = setName;

			return await this.setsRepository.save(newSet);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}
}
