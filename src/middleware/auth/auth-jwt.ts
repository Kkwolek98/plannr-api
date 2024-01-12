import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

dotenv.config();

const jwtOptions: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.APP_SECRET,
};

export function initializeJwtAuth() {
	passport.use(
		new Strategy(jwtOptions, async (payload, done) => {
			try {
				const user = {};
				if (!user) {
					return done(null, false);
				}
				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}),
	);
}
