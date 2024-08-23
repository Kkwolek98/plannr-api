import { dataSource } from "../core/data-source";
import UserDetails from "../entities/user/user-details.entity";

export default class UserService {
	private readonly userDetailsRepository = dataSource.getRepository(UserDetails);

	public async getUserDetails(userId: string): Promise<UserDetails | null> {
		try {
			return await this.userDetailsRepository.findOne({ where: { user: { id: userId } } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	public async updateUserDetails(userId: string, updatedDetails: Partial<UserDetails>): Promise<UserDetails> {
		try {
			const currentDetails = await this.userDetailsRepository.findOne({ where: { user: { id: userId } } });
			const newDetails = { ...currentDetails, ...updatedDetails };
			return await this.userDetailsRepository.save(newDetails);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
