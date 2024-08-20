import { Request, Response } from 'express';
import { CreateUserUsecase } from '../../../../../Application/Usecase/User/CreateUserUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { VerifyUsecase } from '../../../../../Application/Usecase/User/VerifyUsecase';
import { AuthorizationError } from '../../../../../Domain/Exception/AuthorizationError';

export class UserController {
  private readonly registerUsecase: CreateUserUsecase;
  private readonly verifyUsecase: VerifyUsecase;
  constructor(
    registerUsecase: CreateUserUsecase,
    verifyUsecase: VerifyUsecase
  ) {
    this.registerUsecase = registerUsecase;
    this.verifyUsecase = verifyUsecase;
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
}
