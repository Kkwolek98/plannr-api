import { instanceToPlain } from "class-transformer";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service";

dotenv.config();

export default class AuthController {
	private readonly authService: AuthService = new AuthService();

	public async registerLocalUser(req: Request<{}, {}, { email: string; password: string }>, res: Response) {
		const { email, password } = req.body;

		try {
			const user = await this.authService.registerLocalUser(email, password);

			res.json(user);
		} catch (error) {
			res.status(500);
		}
	}

	public async loginLocalUser(req: Request<{}, {}, { email: string; password: string }>, res: Response) {
		const { email, password } = req.body;

		try {
			const user = await this.authService.loginLocalUser(email, password);

			if (!user) {
				res.status(401).json({ message: "Invalid credentials" });
			}

			const token = jwt.sign(instanceToPlain(user), process.env.JWT_SECRET!, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			});

			res.json({ token, user: user });
		} catch (error) {
			res.status(500);
		}
	}
}
