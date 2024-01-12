import dotenv from "dotenv";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import AuthService from "../../services/auth.service";

dotenv.config();

const jwtOptions: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

export function initializeJwtAuth() {
	const authService = new AuthService();

	passport.use(
		new Strategy(jwtOptions, async (payload, done) => {
			console.log("???");
			try {
				const user = await authService.getLocalUser(payload.email);
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
