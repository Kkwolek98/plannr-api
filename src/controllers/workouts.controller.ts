import { Request, Response } from "express";
import { NewWorkoutDTO } from "../core/types/workout/new-workout-DTO";
import Workout from "../entities/workout/workout.entity";
import WorkoutsService from "../services/workouts.service";

export default class WorkoutsController {
	private readonly workoutsService: WorkoutsService = new WorkoutsService();

	public async getAllWorkouts(req: Request, res: Response) {
		try {
			const workouts = await this.workoutsService.getAllWorkouts();
			res.json(workouts);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async getWorkoutById(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		try {
			const workout = await this.workoutsService.getWorkoutById(id);

			if (workout) {
				res.json(workout);
			} else {
				res.status(404).json({ message: "Couldn't find resource" });
			}
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async createWorkout(req: Request<{}, {}, NewWorkoutDTO>, res: Response) {
		try {
			const workout = await this.workoutsService.createWorkout(req.body);

			res.json(workout);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async removeWorkout(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		try {
			const removed = await this.workoutsService.removeWorkout(id);

			res.json({ removed });
		} catch (error) {
			res.status(500).send(error);
		}
	}

	public async updateWorkout(
		req: Request<{ id: string }, {}, Partial<Workout>>,
		res: Response<Workout | unknown>,
	) {
		const { id } = req.params;
		const updatedWorkout = req.body;

		try {
			const workout = await this.workoutsService.updateWorkout(id, updatedWorkout);

			res.json(workout);
		} catch (error) {
			res.status(500).send(error);
		}
	}
}
