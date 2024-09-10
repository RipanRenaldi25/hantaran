import { Request, Response } from 'express';
import { ConnectBoxWithDecorationAndColorUsecase } from '../../../../../Application/Usecase/Box/ConnectBoxWithColorAndDecorationUsecase';
import { ConnectBoxWithColorUsecase } from '../../../../../Application/Usecase/Box/ConnectBoxWithColorUsecase';
import { ConnectBoxWithDecorationUsecase } from '../../../../../Application/Usecase/Box/ConnectBoxWithDecorationUsecase';
import { CreateBoxUsecase } from '../../../../../Application/Usecase/Box/CreateBoxUsecase';
import { DeleteBoxUsecase } from '../../../../../Application/Usecase/Box/DeleteBoxUsecase';
import { GetBoxByIdUsecase } from '../../../../../Application/Usecase/Box/GetBoxByIdUsecase';
import { GetBoxesUsecase } from '../../../../../Application/Usecase/Box/GetBoxesUsecase';
import { getBoxesWithColorAndDecorationUsecase } from '../../../../../Application/Usecase/Box/GetBoxWithColorAndDecorationUsecase';
import { UnconnectBoxDecorationUsecase } from '../../../../../Application/Usecase/Box/UnconnectBoxDecoration';
import { UnconnectBoxWithColorUsecase } from '../../../../../Application/Usecase/Box/UnconnectBoxWithColor';
import { UpdateBoxUsecase } from '../../../../../Application/Usecase/Box/UpdateBoxUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';
import { NotFoundError } from '../../../../../Domain/Exception/NotFoundError';
import {
  validateConnectBoxPayload,
  validateCreateBoxPayload,
  validateUpdateBoxPayload,
} from '../../../../Helper/Validator/Box/BoxValidator';
import { GetBoxWithColorAndDecorationByBoxIdUsecase } from '../../../../../Application/Usecase/Box/GetBoxWithColorsAndDecorationByBoxId';

export class BoxController {
  private readonly createBoxUsecase: CreateBoxUsecase;
  private readonly deleteBoxUsecase: DeleteBoxUsecase;
  private readonly updateBoxUsecase: UpdateBoxUsecase;
  private readonly getBoxesUsecase: GetBoxesUsecase;
  private readonly getBoxByIdUsecase: GetBoxByIdUsecase;
  private readonly connectBoxUsecase: ConnectBoxWithDecorationAndColorUsecase;
  private readonly connectBoxWithColorUsecase: ConnectBoxWithColorUsecase;
  private readonly connectBoxWithDecorationUsecase: ConnectBoxWithDecorationUsecase;

  constructor(
    createBoxUsecase: CreateBoxUsecase,
    deleteBoxUsecase: DeleteBoxUsecase,
    updateBoxUsecase: UpdateBoxUsecase,
    getBoxesUsecase: GetBoxesUsecase,
    getBoxByIdUsecase: GetBoxByIdUsecase,
    connectBoxUsecase: ConnectBoxWithDecorationAndColorUsecase,
    connectBoxWithColorUsecase: ConnectBoxWithColorUsecase,
    connectBoxWithDecorationUsecase: ConnectBoxWithDecorationUsecase,
    private readonly getBoxesWithColorAndDecorationUsecase: getBoxesWithColorAndDecorationUsecase,
    private readonly unconnectBoxWithColorUsecase: UnconnectBoxWithColorUsecase,
    private readonly unconnectBoxWithDecorationUsecase: UnconnectBoxDecorationUsecase,
    private readonly getBoxWithColorAndDecorationByBoxId: GetBoxWithColorAndDecorationByBoxIdUsecase
  ) {
    this.createBoxUsecase = createBoxUsecase;
    this.deleteBoxUsecase = deleteBoxUsecase;
    this.updateBoxUsecase = updateBoxUsecase;
    this.getBoxesUsecase = getBoxesUsecase;
    this.getBoxByIdUsecase = getBoxByIdUsecase;
    this.connectBoxUsecase = connectBoxUsecase;
    this.connectBoxWithColorUsecase = connectBoxWithColorUsecase;
    this.connectBoxWithDecorationUsecase = connectBoxWithDecorationUsecase;
  }

  async createBox(req: Request, res: Response) {
    try {
      validateCreateBoxPayload(req.body);
      if (!req.file) {
        throw new NotFoundError('File not found');
      }
      const minSize = 1024 * 1024 * 0.02;
      if (req.file.size < minSize) {
        throw new Error('Ukuran file terlalu kecil');
      }
      const payload = {
        name: req.body.name,
        imageUrl: req.file.filename,
        price: req.body.price,
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
          message: `Server error: ${err}`,
        });
      }
    }
  }

  async deleteBox(req: Request, res: Response) {
    try {
      const { boxId } = req.params;
      if (!boxId) {
        throw new InvariantError('Box id is required in parameter');
      }
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
      if (!boxId) {
        throw new InvariantError('Box id is required in parameter');
      }
      validateUpdateBoxPayload(req.body);
      const image = req.file;
      const { name, price } = req.body;

      const updatedBox = await this.updateBoxUsecase.execute({
        boxId,
        name,
        imageUrl: image?.filename || '',
        price,
      });
      res.status(201).json({
        Status: 'Success',
        message: 'Box updated',
        data: {
          id: updatedBox.getId().toString(),
          name: updatedBox.getName(),
          imageUrl: updatedBox.getBoxImageUrl(),
          price: updatedBox.getPrice().getValue(),
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

  async getBoxById(req: Request, res: Response) {
    try {
      const { boxId } = req.params;
      if (!boxId) {
        throw new InvariantError('Box id is required in parameter');
      }
      const box = await this.getBoxByIdUsecase.execute(boxId);
      res.status(200).json({
        status: 'Success',
        message: 'Boxes retrieved',
        data: {
          id: box.getId().toString(),
          name: box.getName(),
          price: box.getPrice().getValue(),
          imageUrl: box.getBoxImageUrl(),
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
  async connectBox(req: Request, res: Response) {
    try {
      validateConnectBoxPayload(req.body);
      const { boxId, colorId, decorationId } = req.body;
      const box = await this.connectBoxUsecase.execute({
        boxId,
        colorId,
        decorationId,
      });
      res.status(201).json({
        status: 'Success',
        message: 'Boxes connected',
        data: box,
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

  async connectBoxWithColor(req: Request, res: Response) {
    try {
      const { boxId, colorId } = req.body;
      if (!boxId || !colorId) {
        throw new InvariantError(
          'Box id and color id are required in parameter'
        );
      }
      const box = await this.connectBoxWithColorUsecase.execute({
        boxId,
        colorId,
      });
      res.status(201).json({
        status: 'Success',
        message: 'Boxes connected',
        data: box,
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

  async connectBoxWithDecoration(req: Request, res: Response) {
    try {
      const { boxId, decorationId } = req.body;
      if (!boxId || !decorationId) {
        throw new InvariantError(
          'Box id and color id are required in parameter'
        );
      }
      const box = await this.connectBoxWithDecorationUsecase.execute({
        boxId,
        decorationId,
      });
      res.status(201).json({
        status: 'Success',
        message: 'Boxes connected',
        data: box,
      });
    } catch (err: any) {
      console.log({ err });
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

  async getBoxesWithColorAndDecoration(req: Request, res: Response) {
    try {
      const boxes = await this.getBoxesWithColorAndDecorationUsecase.execute();
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

  async unconnectBoxWithColor(req: Request, res: Response) {
    try {
      const { boxId, colorId } = req.params;
      if (!boxId || !colorId) {
        throw new InvariantError(
          'Box id and color id are required in parameter'
        );
      }
      await this.unconnectBoxWithColorUsecase.execute(boxId, colorId);
      res.status(200).json({
        status: 'Success',
        message: 'Color on box deleted',
        data: {
          boxId,
          colorId,
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
  async unconnectBoxWithDecoration(req: Request, res: Response) {
    try {
      const { boxId, decorationId } = req.params;
      if (!boxId || !decorationId) {
        throw new InvariantError(
          'Box id and color id are required in parameter'
        );
      }
      await this.unconnectBoxWithDecorationUsecase.execute(boxId, decorationId);
      res.status(200).json({
        status: 'Success',
        message: 'Color on box deleted',
        data: {
          boxId,
          decorationId,
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
  async getBoxWithColor(req: Request, res: Response) {
    try {
      const { boxId } = req.params;
      if (!boxId) {
        throw new InvariantError('Box id is required in parameter');
      }
      const boxWithColorAndDecoration =
        await this.getBoxWithColorAndDecorationByBoxId.execute(boxId);
      res.status(200).json({
        status: 'Success',
        message: 'Box with color retrieved',
        data: boxWithColorAndDecoration,
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
