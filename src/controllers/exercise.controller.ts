import { Request, Response } from "express";

export default class ExerciseController {
  public getAllExercises(req: Request, res: Response) {
    res.send([]);
  }

  public getExerciseById(req: Request, res: Response) {
    res.send(req.params.id);
  }

  public createExercise(req: Request, res: Response) {
    res.send("OK");
  }

  public removeExercise(req: Request, res: Response) {
    res.send(req.params.id);
  }

  public updateExercise(req: Request, res: Response) {
    res.send(req.params.id);
  }

}