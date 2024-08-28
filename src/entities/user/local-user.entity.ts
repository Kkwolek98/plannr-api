import bcrypt from "bcrypt";
import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserDetails from "./user-details.entity";

@Entity()
export default class LocalUser {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	email: string;

	@OneToOne(
		() => UserDetails,
		(details) => details.user,
	)
	@JoinColumn()
	details: UserDetails;

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

/**
 * @swagger
 * components:
 *   schemas:
 *     LocalUser:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - details
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *         details:
 *           $ref: '#/components/schemas/UserDetails'
 *         password:
 *           type: string
 */
