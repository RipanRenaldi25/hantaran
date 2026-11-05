import {
  IConfigService,
  IEmailService,
  IJwtService,
  IUserService,
} from '../../Service';

export class ForgotPasswordUsecase {
  constructor(
    private readonly userService: IUserService,
    private readonly jwtService: IJwtService,
    private readonly configService: IConfigService,
    private readonly emailService: IEmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userService.getUserByEmail(email);
    const token = this.jwtService.generateToken(
      { userId: user.getId().toString(), email: user.getEmail() },
      `${this.configService.get('SECRET_EMAIL_TOKEN')}`,
      {
        expiresIn: 3600,
      },
    );

    await this.emailService.sendEmail({
      to: user.getEmail(),
      subject: 'Reset Password',
      from: this.configService.get('SMTP_USER'),
      html: `<p>Click <a href="${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}">here</a> to reset your password</p>`,
    });
  }
}
