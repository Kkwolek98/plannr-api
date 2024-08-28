import { Request, Response } from "express";
import LocalUser from "../entities/user/local-user.entity";
import UserDetails from "../entities/user/user-details.entity";
import UserService from "../services/user.service";

export default class UserController {
	private readonly userService: UserService = new UserService();

	public async getCurrentUserDetails(req: Request<{}, {}, {}>, res: Response) {
		const userId = (req.user as LocalUser)?.id;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
		}

		try {
			const details = await this.userService.getUserDetails(userId);

			if (details) {
				res.json(details);
			} else {
				res.status(404).json({ message: "Couldn't find user details" });
			}
		} catch {
			res.status(500);
		}
	}

	public async updateCurrentUserDetails(req: Request<{}, {}, UserDetails>, res: Response) {
		const userId = (req.user as LocalUser)?.id;
		const updatedDetails = req.body;

		if (!userId) {
			res.status(401).json({ message: "Unauthorized" });
		}

		try {
			const details = await this.userService.updateUserDetails(userId, updatedDetails);

			res.json(details);
		} catch {
			res.status(500);
		}
	}
}
