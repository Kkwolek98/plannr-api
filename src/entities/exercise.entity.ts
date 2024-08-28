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

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - tags
 *         - videos
 *         - owner
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         videos:
 *           type: array
 *           items:
 *             type: string
 *         owner:
 *           $ref: '#/components/schemas/LocalUser'
 */
