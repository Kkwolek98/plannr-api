import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction): void {
	const isDocs = req.path.startsWith("/docs");

	if (!isDocs) {
		const method = req.method;
		const path = req.path;
		const dateNowString = new Date().toISOString();

		const logMessage = buildLogMessage(method, path, dateNowString);

		console.log(logMessage);
	}
	next();
}

function paddedLeft(str: string, length = 7): string {
	const pad = " ".repeat(length - str.length);
	return `${pad}${str}`;
}

function buildLogMessage(method: string, path: string, dateNowString: string): string {
	return `${dateNowString} ${paddedLeft(method)} ${path}`;
}
