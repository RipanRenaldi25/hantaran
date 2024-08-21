import { CreateDecorationUsecase } from '../../../../../Application/Usecase/Decoration/CreateDecorationUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';

export class DecorationController {
  private readonly createDecorationUsecase: CreateDecorationUsecase;
  constructor(createDecorationUsecase: CreateDecorationUsecase) {
    this.createDecorationUsecase = createDecorationUsecase;
  }

  async createDecoration(req: any, res: any) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new InvariantError('name is required');
      }
      const createdDecoration = await this.createDecorationUsecase.execute(
        name
      );
      res.status(201).json({
        status: 'Success',
        message: 'Decoration created',
        data: createdDecoration,
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
