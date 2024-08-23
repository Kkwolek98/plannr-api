import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import LocalUser from "./local-user.entity";

@Entity()
export default class UserDetails {
	@PrimaryGeneratedColumn("uuid")
	@Exclude()
	id: string;

	@OneToOne(
		() => LocalUser,
		(user) => user.details,
	)
	@Exclude()
	user: LocalUser;

	@Column({ name: "first_name", nullable: true })
	firstName: string;

	@Column({ name: "last_name", nullable: true })
	lastName: string;

	@Column({ name: "birth_date", type: "date", nullable: true })
	birthDate: Date;

	@Column({ nullable: true })
	weight: number;

	@Column({ nullable: true })
	height: number;

	toJson() {
		return instanceToPlain(this);
	}
}
