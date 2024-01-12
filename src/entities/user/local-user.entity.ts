import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";

@Entity()
export default class LocalUser {
	@Column({ primary: true })
	email: string;

	@Exclude()
	@Column()
	password: string;

	public async isValidPassword(password: string) {
		return password === this.password; //TODO: hash password
	}
}
