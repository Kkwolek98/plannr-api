import { dataSource } from "../core/data-source";
import ExerciseSet from "../entities/set/exercise-set.entity";

export default class SetsService {
	private readonly setsRepository = dataSource.getRepository(ExerciseSet);
}
