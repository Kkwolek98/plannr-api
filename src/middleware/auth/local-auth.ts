import passport from "passport";
import { Strategy } from "passport-local";

export function initializeLocalAuth() {
	passport.use(
		new Strategy(
			{
				usernameField: "email",
				passwordField: "password",
				session: false,
			},
			async (email, password, done) => {
				// try {
				// 	const user = await User.findOne({ email });
				// 	const validate = await user.isValidPassword(password);
				// 	if (!user || !validate) {
				// 		return done(null, false, { message: "User not found" });
				// 	}
				// 	return done(null, user, { message: "Logged in Successfully" });
				// } catch (error) {
				// 	return done(error);
				// }
			},
		),
	);

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((id, done) => {
		const user = {};
		done(null, user);
	});
}
