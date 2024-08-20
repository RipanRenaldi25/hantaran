import { User } from '../Entity/User/User';
import { UserId } from '../Entity/User/UserId';

export interface IUserRepository {
  create(user: User): Promise<UserId>;
  updateUserByEmail(email: string, user: User): Promise<void>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  checkAvailableEmail(email: string): Promise<boolean>;
  checkAvailableUsername(username: string): Promise<boolean>;
  deleteUserByEmail(email: string): Promise<void>;
}
