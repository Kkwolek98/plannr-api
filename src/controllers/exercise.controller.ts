import { Request, Response } from "express";
import { Exercise } from "../entities/exercise.entity";
import ExerciseService from "../services/exercises.service";

export default class ExerciseController {
	private readonly exerciseService: ExerciseService = new ExerciseService();

	public async getAllExercises(req: Request, res: Response) {
		try {
			const exercises = await this.exerciseService.getAllExercises();
			res.json(exercises);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async getExerciseById(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		try {
			const exercise = await this.exerciseService.getExerciseById(id);

			if (exercise) {
				res.json(exercise);
			} else {
				res.status(404).json({ message: "Couldn't find resource" });
			}
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async createExercise(req: Request<{}, {}, Omit<Exercise, "id">>, res: Response) {
		try {
			const exercise = await this.exerciseService.createExercise(req.body);

			res.json(exercise);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async removeExercise(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		try {
			const removed = await this.exerciseService.removeExercise(id);

			res.json({ removed });
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async updateExercise(req: Request<{ id: string }, {}, Partial<Exercise>>, res: Response) {
		const { id } = req.params;
		const updatedExercise = req.body;

		try {
			const exercise = await this.exerciseService.updateExercise(id, updatedExercise);

			res.json(exercise);
		} catch (error) {
			res.status(500).send(error);
		}
	}
}
