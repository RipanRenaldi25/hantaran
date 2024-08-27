import { UserId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';

export class GetUserByIdUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.getUserById(new UserId(userId));
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return {
      id: user.getId().toString(),
      username: user.getUsername(),
      email: user.getEmail(),
      role: user.getRole().getName().getRole(),
    };
  }
}
