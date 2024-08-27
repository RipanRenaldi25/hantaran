import { UserId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';

export class GetUserLoginUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.getUserWithProfileAndAddress(
      new UserId(userId)
    );
    const userWithRole = await this.userRepository.getUserById(
      new UserId(userId)
    );
    console.log({ user, userWithRole });
    if (!user || !userWithRole) {
      throw new NotFoundError('$User not found');
    }
    return {
      id: user.userId,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      city: user.city,
      postalCode: user.postalCode,
      street: user.street,
      details: user.details,
      username: user.username,
      role: userWithRole.getRole().getName().getRole(),
    };
  }
}
