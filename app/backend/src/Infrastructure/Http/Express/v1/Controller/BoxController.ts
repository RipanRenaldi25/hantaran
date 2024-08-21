import { Request, Response } from 'express';
import { CreateBoxUsecase } from '../../../../../Application/Usecase/Box/CreateBoxUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { NotFoundError } from '../../../../../Domain/Exception/NotFoundError';
import { DeleteBoxUsecase } from '../../../../../Application/Usecase/Box/DeleteBoxUsecase';
import { UpdateBoxUsecase } from '../../../../../Application/Usecase/Box/UpdateBoxUsecase';
import { GetBoxesUsecase } from '../../../../../Application/Usecase/Box/GetBoxesUsecase';

export class BoxController {
  private readonly createBoxUsecase: CreateBoxUsecase;
  private readonly deleteBoxUsecase: DeleteBoxUsecase;
  private readonly updateBoxUsecase: UpdateBoxUsecase;
  private readonly getBoxesUsecase: GetBoxesUsecase;

  constructor(
    createBoxUsecase: CreateBoxUsecase,
    deleteBoxUsecase: DeleteBoxUsecase,
    updateBoxUsecase: UpdateBoxUsecase,
    getBoxesUsecase: GetBoxesUsecase
  ) {
    this.createBoxUsecase = createBoxUsecase;
    this.deleteBoxUsecase = deleteBoxUsecase;
    this.updateBoxUsecase = updateBoxUsecase;
    this.getBoxesUsecase = getBoxesUsecase;
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
      res.status(201).json({
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

  async updateBox(req: Request, res: Response) {
    try {
      const { boxId } = req.params;
      const { name, imageUrl } = req.body;
      const updatedBox = await this.updateBoxUsecase.execute({
        boxId,
        name,
        imageUrl,
      });
      res.status(201).json({
        Status: 'Success',
        message: 'Box updated',
        data: {
          id: updatedBox.getId().toString(),
          name: updatedBox.getName(),
          imageUrl: updatedBox.getBoxImageUrl(),
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

  async getBoxesWithTotal(req: Request, res: Response) {
    try {
      const { page = 1, size = 10 } = req.query;
      const boxes = await this.getBoxesUsecase.execute(+page, +size);
      res.status(200).json({
        status: 'Success',
        message: 'Boxes retrieved',
        data: boxes,
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
