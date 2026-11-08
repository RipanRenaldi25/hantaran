/**
 * Update Password usecase test case
 *  - Should throw not found error when user not found
 *  - Should hash the new password and update the user password when user found
 *  - Should call the function correctly
 */

import { User, UserId } from '../../../../Domain/Entity';
import { NotFoundError } from '../../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../../Domain/Repository/IUserRepository';
import { IPasswordHashService } from '../../../Service';
import { UpdatePasswordUsecase } from '../UpdatePasswordUsecase';

describe('Update Password Usecase', () => {
  it('Should throw not found error when user not found', async () => {
    const mockUserRepository: jest.Mocked<
      Pick<IUserRepository, 'getUserById'>
    > = {
      getUserById: jest
        .fn()
        .mockRejectedValue(new NotFoundError('User not found')),
    };
    const mockPayload = {
      userId: '123',
      password: 'newpassword',
    };

    const updatePasswordUsecase = new UpdatePasswordUsecase(
      mockUserRepository as unknown as IUserRepository,
      {} as any,
    );

    await expect(updatePasswordUsecase.execute(mockPayload)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('Should hash the new password and update the user password when user found', async () => {
    const mockUserRepository: jest.Mocked<
      Pick<IUserRepository, 'getUserById' | 'changeUserPassword'>
    > = {
      getUserById: jest.fn().mockResolvedValue({
        setPassword: jest.fn(),
      }),
      changeUserPassword: jest.fn(),
    };

    const mockPasswordHashService: jest.Mocked<
      Pick<IPasswordHashService, 'hash'>
    > = {
      hash: jest.fn().mockResolvedValue('hashedPassword'),
    };
    const mockPayload = {
      userId: '123',
      password: 'newpassword',
    };

    const updatePasswordUsecase = new UpdatePasswordUsecase(
      mockUserRepository as unknown as IUserRepository,
      mockPasswordHashService as unknown as IPasswordHashService,
    );

    await updatePasswordUsecase.execute(mockPayload);
    expect(mockPasswordHashService.hash).toHaveBeenCalledWith(
      mockPayload.password,
    );
  });

  it('Should orcestrate by calling the function correctly', async () => {
    const mockUser = {
      setPassword: jest.fn(),
      id: new UserId('123'),
    };
    const mockUserRepository: jest.Mocked<
      Pick<IUserRepository, 'getUserById' | 'changeUserPassword'>
    > = {
      getUserById: jest.fn().mockResolvedValue(mockUser),
      changeUserPassword: jest.fn(),
    };

    const mockPasswordHashService: jest.Mocked<
      Pick<IPasswordHashService, 'hash'>
    > = {
      hash: jest.fn().mockResolvedValue('hashedPassword'),
    };

    const mockPayload = {
      userId: '123',
      password: 'newPassword',
    };

    const updatePasswordUsecase = new UpdatePasswordUsecase(
      mockUserRepository as unknown as IUserRepository,
      mockPasswordHashService as unknown as IPasswordHashService,
    );

    await updatePasswordUsecase.execute(mockPayload);

    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(
      new UserId(mockPayload.userId),
    );

    expect(mockPasswordHashService.hash).toHaveBeenCalledWith(
      mockPayload.password,
    );

    expect(mockUserRepository.changeUserPassword).toHaveBeenCalledWith(
      mockUser,
    );
  });
});
