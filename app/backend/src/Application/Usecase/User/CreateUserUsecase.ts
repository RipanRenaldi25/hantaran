import { Role, RoleId } from '../../../Domain/Entity/Role';
import { User, UserId } from '../../../Domain/Entity/User';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';
import { RoleType } from '../../../Domain/ValueObject/RoleType';
import {
  IConfigService,
  IEmailService,
  IJwtService,
  IUserService,
} from '../../Service';
import { IPasswordHashService } from '../../Service/IPasswordHashService';

export class CreateUserUsecase {
  private readonly emailService: IEmailService;
  private readonly configService: IConfigService;
  private readonly userRepository: IUserRepository;
  private readonly jwtService: IJwtService;
  private readonly passwordHashService: IPasswordHashService;
  private readonly idGenerator: () => string;
  constructor(
    emailService: IEmailService,
    userRepository: IUserRepository,
    configService: IConfigService,
    passwordHashService: IPasswordHashService,
    jwtService: IJwtService,
    idGenerator: () => string
  ) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.configService = configService;
    this.passwordHashService = passwordHashService;
    this.jwtService = jwtService;
    this.idGenerator = idGenerator;
  }

  async execute(payload: any) {
    const isEmailAvailable = await this.userRepository.checkAvailableEmail(
      payload.email
    );
    const isUsernameAvailable =
      await this.userRepository.checkAvailableUsername(payload.username);
    console.log({ isEmailAvailable, isUsernameAvailable });
    if (!isEmailAvailable || !isUsernameAvailable) {
      throw new InvariantError('Email or Username is not available');
    }
    const userId = new UserId(this.idGenerator());
    const roleId = payload.role === 'admin' ? new RoleId('1') : new RoleId('2');
    const userRoleType = new RoleType(payload.role);
    const userRole = new Role(roleId, userRoleType);
    const user = new User(
      userId,
      payload.username,
      payload.email,
      payload.password,
      userRole,
      false
    );
    const hashedPassword = await this.passwordHashService.hash(
      user.getPassword()
    );
    user.setPassword(hashedPassword);
    const registeredUserId = await this.userRepository.create(user);
    const generatedTokenEmailPayload = this.jwtService.generateToken(
      {
        email: user.getEmail(),
        username: user.getUsername(),
      },
      this.configService.get('SECRET_EMAIL_TOKEN') || 'emailtokenrahasia',
      { expiresIn: 3600 * 8 }
    );
    await this.emailService.sendEmailVerification({
      to: user.getEmail(),
      from: this.configService.get('SMTP_USER'),
      subject: 'Please Verify Your Email',
      payloadDataToSend: generatedTokenEmailPayload,
    });
    return { registeredUserId };
  }
}
