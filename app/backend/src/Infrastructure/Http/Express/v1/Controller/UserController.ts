import { Request, Response } from 'express';
import { CreateUserUsecase } from '../../../../../Application/Usecase/User/CreateUserUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { VerifyUsecase } from '../../../../../Application/Usecase/User/VerifyUsecase';
import { AuthorizationError } from '../../../../../Domain/Exception/AuthorizationError';
import { LoginUsecase } from '../../../../../Application/Usecase/User/LoginUsecase';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';
import { UpdatePasswordUsecase } from '../../../../../Application/Usecase/User/UpdatePasswordUsecase';

export class UserController {
  private readonly registerUsecase: CreateUserUsecase;
  private readonly verifyUsecase: VerifyUsecase;
  private readonly loginUsecase: LoginUsecase;
  private readonly updateUserUsecase: UpdatePasswordUsecase;
  constructor(
    registerUsecase: CreateUserUsecase,
    verifyUsecase: VerifyUsecase,
    loginUsecase: LoginUsecase,
    updateUserUsecase: UpdatePasswordUsecase
  ) {
    this.registerUsecase = registerUsecase;
    this.verifyUsecase = verifyUsecase;
    this.loginUsecase = loginUsecase;
    this.updateUserUsecase = updateUserUsecase;
  }
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;
      console.log({ username, email, password, role });
      const userId = await this.registerUsecase.execute({
        username,
        email,
        password,
        role,
      });
      res
        .status(201)
        .json({ status: 'Success', message: 'User created', data: userId });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: `Client Error ${err.message}`,
        });
      } else {
        res.status(500).json({
          status: 'Fail',
          message: `Server error ${err.message}`,
        });
      }
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { token } = req.query;
      if (!token) {
        throw new AuthorizationError('Token not found');
      }
      const { verifiedUser } = await this.verifyUsecase.execute(
        token as string
      );
      console.log({ verifiedUser });
      res.status(200).json({
        status: 'Success',
        message: `User verified`,
        data: verifiedUser,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: `Client Error: ${err.message}`,
        });
      } else {
        res.status(500).json({
          status: 'Fail',
          message: `Server error: ${err.message}`,
        });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { uniqueIdentity, password } = req.body;
      const { accessToken, refreshToken } = await this.loginUsecase.execute({
        uniqueIdentity,
        password,
      });
      res.status(200).json({
        status: 'Success',
        message: 'User logged in',
        data: { accessToken, refreshToken },
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: `Client Error: ${err.message}`,
        });
      } else {
        res.status(500).json({
          status: 'Fail',
          message: `Server error: ${err.message}`,
        });
      }
    }
  }

  async changeUserPassword(req: Request, res: Response) {
    try {
      const { password } = req.body;
      if (!password) {
        throw new InvariantError('Password is reuired');
      }
      const user: { id: string; email: string; role: 'admin' | 'user' } = (
        req as any
      )['user'];
      await this.updateUserUsecase.execute({ userId: user.id, password });
      res.status(200).json({
        status: 'Success',
        message: 'User password change successfully',
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: `Client Error: ${err.message}`,
        });
      } else {
        res.status(500).json({
          status: 'Fail',
          message: `Server error: ${err.message}`,
        });
      }
    }
  }
}
