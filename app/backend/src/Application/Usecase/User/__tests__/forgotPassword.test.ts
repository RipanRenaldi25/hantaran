import {
  IConfigService,
  IEmailService,
  IJwtService,
  IUserService,
} from '../../../Service';
import { ForgotPasswordUsecase } from '../ForgotPasswordUsecase';

describe('Forgot Password Usecase', () => {
  it('Should oscestrate the usecase', async () => {
    const mockUser = {
      getId: () => ({ toString: () => 'userId' }),
      getEmail: () => 'test@gmail.com',
    };
    const mockUserService: jest.Mocked<Pick<IUserService, 'getUserByEmail'>> = {
      getUserByEmail: jest.fn().mockResolvedValue(mockUser),
    };

    const mockJwtService: jest.Mocked<Pick<IJwtService, 'generateToken'>> = {
      generateToken: jest.fn().mockReturnValue('sometoken'),
    };
    const mockConfigService: jest.Mocked<Pick<IConfigService, 'get'>> = {
      get: jest.fn().mockReturnValue('someValue'),
    };
    const mockEmailService: jest.Mocked<Pick<IEmailService, 'sendEmail'>> = {
      sendEmail: jest.fn().mockResolvedValue(undefined),
    };
    const forgotPasswordUsecase = new ForgotPasswordUsecase(
      mockUserService as unknown as IUserService,
      mockJwtService as unknown as IJwtService,
      mockConfigService as unknown as IConfigService,
      mockEmailService as unknown as IEmailService,
    );

    await forgotPasswordUsecase.execute(mockUser.getEmail());

    expect(mockUserService.getUserByEmail).toHaveBeenCalledWith(
      mockUser.getEmail(),
    );
    expect(mockJwtService.generateToken).toHaveBeenCalledWith(
      {
        userId: mockUser.getId().toString(),
        email: mockUser.getEmail(),
      },
      'someValue',
      {
        expiresIn: 3600,
      },
    );
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith({
      to: mockUser.getEmail(),
      subject: 'Reset Password',
      from: 'someValue',
      html: `<p>Click <a href="someValue/reset-password?token=sometoken">here</a> to reset your password</p>`,
    });
  });
});
