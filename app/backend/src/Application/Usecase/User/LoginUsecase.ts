import { AuthorizationError } from '../../../Domain/Exception/AuthorizationError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';
import {
  IConfigService,
  IJwtService,
  IPasswordHashService,
} from '../../Service';

export class LoginUsecase {
  private readonly userRepository: IUserRepository;
  private readonly passwordHashService: IPasswordHashService;
  private readonly jwtService: IJwtService;
  private readonly configService: IConfigService;
  constructor(
    userRepository: IUserRepository,
    passwordHashService: IPasswordHashService,
    jwtService: IJwtService,
    configService: IConfigService
  ) {
    this.userRepository = userRepository;
    this.passwordHashService = passwordHashService;
    this.jwtService = jwtService;
    this.configService = configService;
  }

  async execute(payload: any) {
    const { uniqueIdentity, password } = payload;
    const user = await this.userRepository.getUserByUniqueIdentity(
      uniqueIdentity
    );
    if (!user) {
      throw new AuthorizationError('User does not exist');
    }
    if (!user.getIsVerified()) {
      throw new AuthorizationError('User is not verified');
    }
    const isPasswordValid = await this.passwordHashService.compare(
      password,
      user.getPassword()
    );
    if (!isPasswordValid) {
      throw new AuthorizationError('Password is not valid');
    }
    const payloadToken = {
      id: user.getId().toString(),
      email: user.getEmail(),
      role: user.getRole().getName().getRole(),
    };
    const accessToken = this.jwtService.generateToken(
      payloadToken,
      this.configService.get('SECRET_ACCESS_TOKEN') || 'accesstokenrahasia',
      {
        expiresIn: 3600 * 3,
      }
    );
    const refreshToken = this.jwtService.generateToken(
      payloadToken,
      this.configService.get('SECRET_REFRESH_TOKEN' || 'refreshtokenrahasia'),
      { expiresIn: 3600 * 8 }
    );
    return { accessToken, refreshToken };
  }
}
