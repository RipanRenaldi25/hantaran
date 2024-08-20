import { User } from '../Entity/User/User';
import { UserId } from '../Entity/User/UserId';

export interface IUserRepository {
  create(user: User): Promise<UserId>;
}
