import nodemailer, { Transporter } from 'nodemailer';
import {
  IConfigService,
  IEmailService,
  ISendEmailOption,
} from '../../Application/Service';

export class EmailService implements IEmailService {
  private readonly transporter: Transporter;
  private readonly nodemailModule: typeof nodemailer;
  constructor(
    nodemailModule: typeof nodemailer,
    configService: IConfigService
  ) {
    this.nodemailModule = nodemailer;
    this.transporter = this.nodemailModule.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      service: 'gmail',
    });
  }
  async sendEmail(options: ISendEmailOption): Promise<void> {
    try {
      const { from, subject, to, payloadDataToSend, html } = options;
      console.log({ options });
      await this.transporter.sendMail({
        from,
        to: to,
        subject: subject,
        html,
      });
    } catch (err) {
      console.log({ err });
    }
  }
  async sendEmailVerification(options: ISendEmailOption): Promise<void> {
    try {
      const { from, subject, to, payloadDataToSend } = options;
      console.log({ options });
      await this.sendEmail({
        from,
        to: to,
        subject: subject,
        html: `
        <h1> Please verify your email account by click the link below </h1>
        <a href="${process.env.API_BASE_URL}/users/verify?token=${payloadDataToSend}">Click here</a>
    `,
      });
    } catch (err) {
      console.log({ err });
    }
  }
}
