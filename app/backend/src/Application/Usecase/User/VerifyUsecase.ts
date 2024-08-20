import { AuthorizationError } from '../../../Domain/Exception/AuthorizationError';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';
import { IConfigService, IJwtService, IUserService } from '../../Service';
export class VerifyUsecase {
  private readonly userRepository: IUserRepository;
  private readonly jwtService: IJwtService;
  private readonly configService: IConfigService;
  constructor(
    userRepository: IUserRepository,
    jwtService: IJwtService,
    configService: IConfigService
  ) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.configService = configService;
  }

  async execute(token: string) {
    const { email, username }: { email: string; username: string } =
      await this.jwtService.verifyToken(
        token,
        this.configService.get('SECRET_EMAIL_TOKEN')
      );
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (user.getIsVerified()) {
      throw new AuthorizationError(
        'User already verified, please login to proceed'
      );
    }
    user.setIsVerified(true);
    console.log({ user });
    await this.userRepository.updateUserByEmail(email, user);

    return { verifiedUser: user };
  }
}
