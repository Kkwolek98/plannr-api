import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { NewWorkoutDTO } from "../core/types/workout/new-workout-DTO";
import { ReorderSetsDTO } from "../dtos/workouts/reorder-sets-DTO";
import ExerciseSet from "../entities/set/exercise-set.entity";
import WorkoutTemplate from "../entities/workout/workout.entity";
import WorkoutTemplatesService from "../services/workout-templates.service";
import { enrichWithOwner } from "../utils/owner-enrich";

export default class WorkoutsController {
	private readonly workoutTemplatesService: WorkoutTemplatesService = new WorkoutTemplatesService();

	public async getAllWorkoutTemplates(req: Request, res: Response) {
		try {
			const workoutTemplates = await this.workoutTemplatesService.getAllWorkoutTemplates();
			res.json(workoutTemplates);
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	}

	public async getWorkoutTemplatesById(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		try {
			const workoutTemplate = await this.workoutTemplatesService.getWorkoutTemplateById(id);

			if (workoutTemplate) {
				res.json(workoutTemplate);
			} else {
				res.status(404).json({ message: "Couldn't find resource" });
			}
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	}

	public async createWorkoutTemplate(req: Request<{}, {}, NewWorkoutDTO>, res: Response) {
		try {
			const workoutTemplate = await this.workoutTemplatesService.createWorkoutTemplate(
				enrichWithOwner(req.body, req),
			);

			res.json(workoutTemplate);
		} catch (error) {
			res.status(500);
		}
	}

	public async removeWorkoutTemplate(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		try {
			const removed = await this.workoutTemplatesService.removeWorkoutTemplate(id);

			res.json({ removed });
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	}

	public async updateWorkoutTemplate(
		req: Request<{ id: string }, {}, Partial<WorkoutTemplate>>,
		res: Response<WorkoutTemplate | unknown>,
	) {
		const { id } = req.params;
		const updatedWorkoutTemplate = req.body;

		try {
			const workoutTemplate = await this.workoutTemplatesService.updateWorkoutTemplate(id, updatedWorkoutTemplate);

			res.json(workoutTemplate);
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	}

	public async addEmptySetToWorkoutTemplate(
		req: Request<{ id: string }, {}, Pick<ExerciseSet, "name">>,
		res: Response,
	) {
		const { id } = req.params;
		const { name } = req.body;

		try {
			const workoutTemplate = await this.workoutTemplatesService.addEmptySetToWorkoutTemplate(id, name);

			res.json(instanceToPlain(workoutTemplate));
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	}

	public async reorderSet(req: Request<{ id: string }, {}, ReorderSetsDTO>, res: Response) {
		const { id } = req.params;
		const reorderDTO = req.body;

		try {
			const workoutTemplate = await this.workoutTemplatesService.reorderSet(id, reorderDTO);

			res.json(instanceToPlain(workoutTemplate));
		} catch (error) {
			console.error(error);
			res.status(500);
		}
	}
}
