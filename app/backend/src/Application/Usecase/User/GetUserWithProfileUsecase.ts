import { UserId } from '../../../Domain/Entity';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';

export class getUserWithProfile {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string) {
    const result = await this.userRepository.getUserWithProfile(
      new UserId(userId)
    );

    return result;
  }
}
