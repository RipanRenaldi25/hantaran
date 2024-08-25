import { Request, Response } from 'express';
import { CreateCartUsecase } from '../../../../../Application/Usecase/Cart/CreateCartUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { validateCreateCartPayload } from '../../../../Helper/Validator/Cart/CartValidator';
import { DeleteItemFromCartUsecase } from '../../../../../Application/Usecase/Cart/DeleteItemFromCartUsecase';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';

export class CartController {
  constructor(
    private readonly createCartUsecase: CreateCartUsecase,
    private readonly deleteItemFromCartUsecase: DeleteItemFromCartUsecase
  ) {}

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
  async deleteItemFromCart(req: Request, res: Response) {
    try {
      const { id: userId } = (req as any)['user'];
      const { boxId, cartId } = req.params;
      if (!boxId || !cartId) {
        throw new InvariantError('Invalid cart id or box id (cannot be empty)');
      }
      const deletedItem = await this.deleteItemFromCartUsecase.execute({
        userId,
        boxId,
        cartId,
      });

      res.status(200).json({
        status: 'Success',
        message: 'item deleted from cart',
        data: deletedItem,
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
