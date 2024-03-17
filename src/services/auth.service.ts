import { dataSource } from "../core/data-source";
import LocalUser from "../entities/user/local-user.entity";

export default class AuthService {
	private readonly localUserRepository = dataSource.getRepository(LocalUser);

	public async registerLocalUser(email: string, password: string): Promise<LocalUser> {
		try {
			const user = new LocalUser();
			user.email = email;
			user.password = await LocalUser.hashPassword(password);
			return await this.localUserRepository.save(user);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async loginLocalUser(email: string, password: string): Promise<LocalUser | null> {
		try {
			const user = await this.localUserRepository.findOne({ where: { email } });
			if (!user) {
				return null;
			}
			const isPasswordValid = await user.isValidPassword(password);
			if (!isPasswordValid) {
				return null;
			}
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async getLocalUser(email: string): Promise<LocalUser | null> {
		try {
			return await this.localUserRepository.findOne({ where: { email } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
