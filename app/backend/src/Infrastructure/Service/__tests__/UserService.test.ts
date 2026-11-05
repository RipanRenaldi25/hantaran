/**
 * Register
 *  Should throw error if user already exists
 *  Should return userId if user is successfully registered
 *
 * GetUserByEmail
 *  Should throw not found error if user does not exists
 *  Should return user if user exists
 *
 * GetUserByUsername
 * Should throw not found error if user does not exists
 *  Should return user if user exists
 */

import { User, UserId } from '../../../Domain/Entity';
import { ConflictError } from '../../../Domain/Exception/ConflictError';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';
import { UserService } from '../UserService';

describe('User Service', () => {
  describe('Register', () => {
    it('Should throw error if user already exists', async () => {
      const mockUserRepository: jest.Mocked<Pick<IUserRepository, 'create'>> = {
        create: jest
          .fn()
          .mockRejectedValue(new ConflictError('User already exists')),
      };

      const userService = new UserService(
        mockUserRepository as unknown as IUserRepository,
      );

      await expect(userService.register({} as unknown as User)).rejects.toThrow(
        'User already exists',
      );
    });

    it('Should return userId if user sucessfully registered', async () => {
      const mockUserRepository: jest.Mocked<Pick<IUserRepository, 'create'>> = {
        create: jest.fn().mockResolvedValue(new UserId('userId')),
      };
      const userService = new UserService(
        mockUserRepository as unknown as IUserRepository,
      );

      const userId = await userService.register({} as unknown as User);

      expect(userId).toBeInstanceOf(UserId);
      expect(userId.toString()).toBe('userId');
    });
  });

  describe('GetUserByEmail', () => {
    it('Should throw not found error if user does not exists', async () => {
      const mockUserRepository: jest.Mocked<
        Pick<IUserRepository, 'getUserByEmail'>
      > = {
        getUserByEmail: jest
          .fn()
          .mockRejectedValue(new NotFoundError('User not found')),
      };

      const userService = new UserService(
        mockUserRepository as unknown as IUserRepository,
      );

      await expect(userService.getUserByEmail('any')).rejects.toThrow(
        NotFoundError,
      );
    });

    it('Should return user if user exists', async () => {
      const mockUser: User = new User(
        new UserId('userId'),
        'username',
        'email',
        'Password123!',
        {} as any,
      );

      const mockUserRepository: jest.Mocked<
        Pick<IUserRepository, 'getUserByEmail'>
      > = {
        getUserByEmail: jest.fn().mockResolvedValue(mockUser),
      };

      const userService = new UserService(
        mockUserRepository as unknown as IUserRepository,
      );

      const user = await userService.getUserByEmail('test@gmail.com');

      expect(user).toBe(mockUser);
    });
  });
});
