import { Request, Response } from "express";
import ExerciseSet from "../entities/set/exercise-set.entity";
import SetItem from "../entities/set/set-item.entity";
import SetsService from "../services/sets.service";

export default class SetController {
	private readonly setService: SetsService = new SetsService();

	public async addItemToSet(req: Request<{ id: string }, {}, Partial<SetItem>>, res: Response) {
		try {
			const { id } = req.params;

			const set = await this.setService.addItemToSet(id, req.body);

			res.send(set);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error });
		}
	}

	public async removeItemFromSet(req: Request<{ itemId: string }, {}, {}>, res: Response) {
		try {
			const { itemId } = req.params;

			const removed = await this.setService.removeItemFromSet(itemId);

			res.send({ removed });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error });
		}
	}

	public async updateSet(
		req: Request<{ id: string }, {}, Partial<ExerciseSet>>,
		res: Response<ExerciseSet | { error: unknown }>,
	) {
		try {
			const { id } = req.params;
			const updatedSet = req.body;

			const set = await this.setService.updateSet(id, updatedSet);

			res.send(set);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error });
		}
	}

	public async removeSet(req: Request<{ id: string }, {}, {}>, res: Response) {
		try {
			const { id } = req.params;

			const removed = await this.setService.removeSet(id);

			res.send({ removed });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error });
		}
	}
}
