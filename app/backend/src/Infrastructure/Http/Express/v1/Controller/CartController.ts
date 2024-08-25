import { Request, Response } from 'express';
import { CreateCartUsecase } from '../../../../../Application/Usecase/Cart/CreateCartUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { validateCreateCartPayload } from '../../../../Helper/Validator/Cart/CartValidator';

export class CartController {
  constructor(private readonly createCartUsecase: CreateCartUsecase) {}

  async createCart(req: Request, res: Response) {
    try {
      validateCreateCartPayload(req.body);
      const { id: userId } = (req as any)['user'];
      const { items } = req.body;
      const createdCart = await this.createCartUsecase.execute({
        items,
        userId,
      });
      res.status(201).json({
        status: 'Success',
        message: 'Cart created',
        data: createdCart,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: `Client error: ${err.message}`,
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
