import { Role, RoleId } from '../../../Domain/Entity/Role';
import { User, UserId } from '../../../Domain/Entity/User';
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
  private readonly userService: IUserService;
  private readonly jwtService: IJwtService;
  private readonly passwordHashService: IPasswordHashService;
  private readonly idGenerator: () => string;
  constructor(
    emailService: IEmailService,
    userService: IUserService,
    configService: IConfigService,
    passwordHashService: IPasswordHashService,
    jwtService: IJwtService,
    idGenerator: () => string
  ) {
    this.userService = userService;
    this.emailService = emailService;
    this.configService = configService;
    this.passwordHashService = passwordHashService;
    this.jwtService = jwtService;
    this.idGenerator = idGenerator;
  }

  async execute(payload: any) {
    const userId = new UserId(this.idGenerator());
    const roleId = payload.role === 'admin' ? new RoleId('1') : new RoleId('2');
    const userRoleType = new RoleType(payload.role);
    const userRole = new Role(roleId, userRoleType);
    console.log({ userRole });
    const user = new User(
      userId,
      payload.username,
      payload.email,
      payload.password,
      userRole,
      false
    );
    console.log({ userBeforeHashed: user });
    const hashedPassword = await this.passwordHashService.hash(
      user.getPassword()
    );
    console.log({ hashedPassword });
    user.setPassword(hashedPassword);
    console.log({ userAfterHashed: user });
    const registeredUserId = await this.userService.register(user);
    console.log({ registeredUserId });
    const generatedTokenEmailPayload = this.jwtService.generateToken(
      {
        email: user.getEmail(),
        username: user.getUsername,
      },
      this.configService.get('SECRET_EMAIL_TOKEN') || 'emailtokenrahasia',
      { expiresIn: 3600 * 8 }
    );
    console.log({ generatedTokenEmailPayload });
    const test = await this.emailService.sendEmailVerification({
      to: user.getEmail(),
      from: this.configService.get('SMTP_USER'),
      subject: 'Please Verify Your Email',
      payloadDataToSend: generatedTokenEmailPayload,
    });
    console.log({ test });
    return { registeredUserId };
  }
}
