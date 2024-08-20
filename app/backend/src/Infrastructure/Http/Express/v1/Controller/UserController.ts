import { Request, Response } from 'express';
import { IUserController } from '../../../../../Interfaces/HTTP/Presenter';
import { CreateUserUsecase } from '../../../../../Application/Usecase/User/CreateUserUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';

export class UserController {
  private readonly registerUsecase: CreateUserUsecase;
  constructor(registerUsecase: CreateUserUsecase) {
    this.registerUsecase = registerUsecase;
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
}
