export interface IEmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface ISendEmailOption {
  from: string;
  to: string;
  subject: string;
  payloadDataToSend?: any;
  html?: string;
  text?: string;
  attachments?: any;
  cc?: string;
}

export interface IEmailService {
  sendEmail(options: ISendEmailOption): Promise<void>;
  sendEmailVerification(options: ISendEmailOption): Promise<void>;
}
