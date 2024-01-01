import { Request, Response } from "express";
import SetItem from "../entities/set/set-item.entity";
import SetsService from "../services/sets.service";

export default class SetController {
	private readonly setService: SetsService = new SetsService();

	public async addItemToSet(req: Request<{ id: string }, {}, Partial<SetItem>>, res: Response) {
		console.log("hehe");
		try {
			const { id } = req.params;

			console.log({ id });

			const set = await this.setService.addItemToSet(id, req.body);

			res.send(set);
		} catch (error) {
			res.status(500).send({ error });
		}
	}
}
