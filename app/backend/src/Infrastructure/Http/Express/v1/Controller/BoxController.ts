import { Request, Response } from 'express';
import { CreateBoxUsecase } from '../../../../../Application/Usecase/Box/CreateBoxUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { NotFoundError } from '../../../../../Domain/Exception/NotFoundError';
import { DeleteBoxUsecase } from '../../../../../Application/Usecase/Box/DeleteBoxUsecase';

export class BoxController {
  private readonly createBoxUsecase: CreateBoxUsecase;
  private readonly deleteBoxUsecase: DeleteBoxUsecase;

  constructor(
    createBoxUsecase: CreateBoxUsecase,
    deleteBoxUsecase: DeleteBoxUsecase
  ) {
    this.createBoxUsecase = createBoxUsecase;
    this.deleteBoxUsecase = deleteBoxUsecase;
  }

  async createBox(req: Request, res: Response) {
    try {
      if (!req.file) {
        throw new NotFoundError('File not found');
      }
      const minSize = 1024 * 1024 * 0.02;
      if (req.file.size < minSize) {
        throw new Error('test');
      }
      const payload = {
        name: req.body.name,
        imageUrl: req.file.filename,
      };
      const boxId = await this.createBoxUsecase.execute(payload);
      res
        .status(201)
        .json({ status: 'Success', message: 'Box created', data: boxId });
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
  async deleteBox(req: Request, res: Response) {
    try {
      const { boxId } = req.params;
      const deletedBoxId = await this.deleteBoxUsecase.execute(boxId);
      res
        .status(201)
        .json({
          Status: 'Success',
          message: 'Box deleted',
          data: deletedBoxId,
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
