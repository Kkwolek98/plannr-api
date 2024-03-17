import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import LocalUser from "./user/local-user.entity";

@Entity()
export class Exercise {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("varchar", { nullable: true })
	description?: string;

	@Column("simple-array")
	tags: string[];

	@Column("simple-array")
	videos: string[];

	@ManyToOne(
		() => LocalUser,
		(user) => user.id,
		{ eager: true },
	)
	owner: LocalUser;
}
