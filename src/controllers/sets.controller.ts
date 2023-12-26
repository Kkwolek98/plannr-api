import { Request, Response } from "express";
import SetsService from "../services/sets.service";

export default class SetController {
	private readonly setService: SetsService = new SetsService();

	public async getAllSets(req: Request, res: Response) {}

	public async getSetById(req: Request, res: Response) {}

	public async createSet(req: Request, res: Response) {}

	public async removeSet(req: Request, res: Response) {}

	public async updateSet(req: Request, res: Response) {}
}
