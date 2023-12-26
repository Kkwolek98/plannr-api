import { Request, Response } from "express";
import SetsService from "../services/sets.service";

export default class SetController {
	private readonly setService: SetsService = new SetsService();

	public async addItemToSet(req: Request, res: Response) {}
}
