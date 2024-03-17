import bcrypt from "bcrypt";
import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class LocalUser {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	email: string;

	@Exclude()
	@Column()
	password: string;

	toJSON() {
		return instanceToPlain(this);
	}

	public static async hashPassword(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	}

	public async isValidPassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
