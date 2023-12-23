import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise.entity";

@Entity()
export class PlannedExercise {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "min_reps" })
  minReps: number;

  @Column({ name: "max_reps" })
  maxReps: number;

  @Column({ name: "rep_type" })
  repType: string;

  @ManyToOne(() => Exercise, { eager: true })
  @JoinColumn({ name: "exercise_id" })
  exercise: Exercise
}