import { Request } from "express";
import LocalUser from "../entities/user/local-user.entity";

export function enrichWithOwner<T>(entity: T, req: Request): T & { owner: LocalUser } {
	const owner = req.user as LocalUser;

	if (!owner) {
		throw Error("User undefined");
	}

	return { ...entity, owner };
}
