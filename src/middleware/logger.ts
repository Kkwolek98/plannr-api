import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
	const isDocs = req.path.startsWith("/docs");

	if (!isDocs) {
		console.log(`${req.method.toUpperCase()}: ${req.path}`);
	}
	next();
}
