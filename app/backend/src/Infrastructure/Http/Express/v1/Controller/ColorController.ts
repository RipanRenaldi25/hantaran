import { Request, Response } from 'express';
import { CreateColorUsecase } from '../../../../../Application/Usecase/Color/CreateColorUsecase';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { GetColorUsecase } from '../../../../../Application/Usecase/Color/GetColorUsecase';

export class ColorController {
  private readonly createColorUsecase: CreateColorUsecase;
  constructor(
    createColorUsecase: CreateColorUsecase,
    private readonly getColorUsecase: GetColorUsecase
  ) {
    this.createColorUsecase = createColorUsecase;
  }

  async createColor(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new InvariantError('name is required');
      }
      const createdColor = await this.createColorUsecase.execute(name);
      res.status(201).json({
        status: 'Success',
        message: 'Color created',
        data: createdColor,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'fail',
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 'fail',
          message: err.message,
        });
      }
    }
  }

  async getColors(req: Request, res: Response) {
    try {
      const colors = await this.getColorUsecase.execute();
      res.status(200).json({
        status: 'Success',
        message: 'Colors fetched',
        data: colors,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'fail',
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: 'fail',
          message: err.message,
        });
      }
    }
  }
}
