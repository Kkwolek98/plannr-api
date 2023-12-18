import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  description?: string;

  /// yt videos links
}