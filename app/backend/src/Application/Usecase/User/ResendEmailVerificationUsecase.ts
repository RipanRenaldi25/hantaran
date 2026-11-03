import { User } from '../../../Domain/Entity';
import { IConfigService, IEmailService, IJwtService } from '../../Service';

export class ResendEmailVerificationUsecase {
  private readonly emailService: IEmailService;
  private readonly configService: IConfigService;
  private readonly jwtService: IJwtService;
  constructor(
    emailService: IEmailService,
    configService: IConfigService,
    jwtService: IJwtService,
  ) {
    this.emailService = emailService;
    this.configService = configService;
    this.jwtService = jwtService;
  }

  async execute(email: string): Promise<void> {
    const generatedToken = this.jwtService.generateToken(
      { email },
      this.configService.get('SECRET_EMAIL_TOKEN') || 'emailtokenrahasia',
      { expiresIn: 3600 * 24 },
    );

    await this.emailService.sendEmailVerification({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Email Verification',
      payloadDataToSend: generatedToken,
    });
  }
}
