import { Request, Response } from "express";
import { NewWorkoutPlanningDTO } from "../dtos/planning/new-workout-planning.DTO";
import PlanningService from "../services/planning.service";

export default class PlanningController {
	private readonly planningService = new PlanningService();

	public async planWorkout(req: Request<{}, {}, NewWorkoutPlanningDTO>, res: Response) {
		//TODO: validate inputs
		const newWorkoutPlanningDTO = req.body;
		try {
			const plannedWorkouts = await this.planningService.planWorkout(newWorkoutPlanningDTO);

			res.json(plannedWorkouts);
		} catch {
			res.status(500);
		}
	}
}
