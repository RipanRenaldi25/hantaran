import { UserId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';
import { PasswordHashService } from '../../../Infrastructure/Service/PasswordHashService';
import { IJwtService } from '../../Service';

export class UpdatePasswordUsecase {
  private readonly userRepository: IUserRepository;
  private readonly passwordHashService: PasswordHashService;
  constructor(
    userRepository: IUserRepository,
    passwordHashService: PasswordHashService
  ) {
    this.userRepository = userRepository;
    this.passwordHashService = passwordHashService;
  }

  async execute(payload: { userId: string; password: string }) {
    const user = await this.userRepository.getUserById(
      new UserId(payload.userId)
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const newPassword = await this.passwordHashService.hash(payload.password);
    user.setPassword(newPassword);
    await this.userRepository.changeUserPassword(user);
  }
}
