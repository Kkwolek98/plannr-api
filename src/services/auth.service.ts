import { dataSource } from "../core/data-source";
import LocalUser from "../entities/user/local-user.entity";
import UserService from "./user.service";

export default class AuthService {
	private readonly localUserRepository = dataSource.getRepository(LocalUser);
	private readonly userService = new UserService();

	public async registerLocalUser(email: string, password: string): Promise<LocalUser> {
		try {
			const user = new LocalUser();
			user.email = email;
			user.password = await LocalUser.hashPassword(password);
			// TODO: transaction perhaps
			const savedUser = await this.localUserRepository.save(user);
			savedUser.details = await this.userService.createUserDetails(savedUser);
			return savedUser;
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

	public async getLocalUser(id: string): Promise<LocalUser | null> {
		try {
			return await this.localUserRepository.findOne({ where: { id } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
