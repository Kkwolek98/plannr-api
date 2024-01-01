import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("varchar", { nullable: true })
	description?: string;

	@Column("simple-array", { nullable: true })
	tags: string[];

	@Column("simple-array")
	videos: string[];
}
