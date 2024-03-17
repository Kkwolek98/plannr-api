import bcrypt from "bcrypt";
import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity } from "typeorm";

@Entity()
export default class LocalUser {
	@Column({ primary: true })
	email: string;

	@Exclude()
	@Column()
	password: string;

	toJSON() {
		return instanceToPlain(this);
	}

	public static async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	public async isValidPassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
