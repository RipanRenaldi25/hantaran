import { InvariantError } from '../../../../Domain/Exception/InvariantError';
import { IUserRepository } from '../../../../Domain/Repository/IUserRepository';
import { CreateUserUsecase } from '../CreateUserUsecase';

describe('Create User Usecase', () => {
  it('Should throw InvariantError if email is registered', async () => {
    const mockPayload = {
      username: 'test',
      email: 'test@gmail.com',
    };
    const mockUserRepository: jest.Mocked<
      Pick<IUserRepository, 'checkAvailableUsername' | 'checkAvailableEmail'>
    > = {
      checkAvailableUsername: jest.fn().mockResolvedValue(true),
      checkAvailableEmail: jest.fn().mockResolvedValue(false),
    };
    const createUserUsecase = new CreateUserUsecase(
      {} as any,
      mockUserRepository as unknown as IUserRepository,
      {} as any,
      {} as any,
      {} as any,
      () => '',
    );

    await expect(createUserUsecase.execute(mockPayload)).rejects.toThrow(
      InvariantError,
    );
  });
  it('Should throw InvariantError if username is available', async () => {
    const mockPayload = {
      username: 'test',
      email: 'test@gmail.com',
    };
    const mockUserRepository: jest.Mocked<
      Pick<IUserRepository, 'checkAvailableEmail' | 'checkAvailableUsername'>
    > = {
      checkAvailableEmail: jest.fn().mockResolvedValue(true),
      checkAvailableUsername: jest.fn().mockResolvedValue(false),
    };

    const createUserUsecase = new CreateUserUsecase(
      {} as any,
      mockUserRepository as unknown as IUserRepository,
      {} as any,
      {} as any,
      {} as any,
      () => '',
    );

    await expect(createUserUsecase.execute(mockPayload)).rejects.toThrow(
      InvariantError,
    );
  });
});
