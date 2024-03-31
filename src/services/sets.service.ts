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

			const savedItem = await this.setItemsRepository.save(setItem);
			const newSetItem = await this.setItemsRepository.findOne({ where: { id: savedItem.id } });

			if (!newSetItem) {
				throw new Error("Set item could not be found");
			}

			set.setItems.push(newSetItem);

			return await this.setsRepository.save(set);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async removeItemFromSet(itemId: string): Promise<boolean> {
		try {
			const item = await this.setItemsRepository.findOne({ where: { id: itemId } });

			if (!item) {
				return false;
			}

			return await !!this.setItemsRepository.remove(item);
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
			newSet.sort = workout.sets?.length;
			newSet.setItems = [];

			return await this.setsRepository.save(newSet);
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async updateSet(id: string, updatedSet: Partial<ExerciseSet>): Promise<ExerciseSet> {
		//TODO: Validate input
		try {
			const set = await this.setsRepository.findOne({ where: { id } });

			return await this.setsRepository.save({ ...set, ...updatedSet });
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}

	public async removeSet(id: string): Promise<boolean> {
		try {
			const set = await this.setsRepository.findOne({ where: { id } });

			if (!set) {
				return false;
			}

			const removedSet = await this.setsRepository.remove(set);

			return true;
		} catch (error) {
			console.error(error);
			throw Error(`${error}`);
		}
	}
}
