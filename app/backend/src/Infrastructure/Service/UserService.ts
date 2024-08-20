import { IUserService } from '../../Application/Service';
import { User, UserId } from '../../Domain/Entity/User';
import { IUserRepository } from '../../Domain/Repository/IUserRepository';

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async register(user: User): Promise<UserId> {
    const userId = await this.userRepository.create(user);
    return userId;
  }
  async getUserByEmail(email: string): Promise<User> {
    return {} as User;
  }

  async getUserByUsername(username: string): Promise<User> {
    return {} as User;
  }

  async verifyUser(userId: UserId): Promise<void> {}
}
