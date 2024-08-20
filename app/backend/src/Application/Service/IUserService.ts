import { UserId } from '../../Domain/Entity/User';
import { User } from '../../Domain/Entity/User/User';

export interface IUserService {
  register(user: User): Promise<UserId>;
  verifyUser(userId: UserId): Promise<void>;
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
