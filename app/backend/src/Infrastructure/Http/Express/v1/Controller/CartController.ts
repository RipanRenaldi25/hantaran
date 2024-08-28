import { Request, Response } from 'express';
import { CreateCartUsecase } from '../../../../../Application/Usecase/Cart/CreateCartUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { validateCreateCartPayload } from '../../../../Helper/Validator/Cart/CartValidator';
import { DeleteItemFromCartUsecase } from '../../../../../Application/Usecase/Cart/DeleteItemFromCartUsecase';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';
import { UpdateCartItemUsecase } from '../../../../../Application/Usecase/Cart/UpdateCartItemUsecase';
import { GetUserCartUsecase } from '../../../../../Application/Usecase/Cart/GetUserCartUsecase';

export class CartController {
  constructor(
    private readonly createCartUsecase: CreateCartUsecase,
    private readonly deleteItemFromCartUsecase: DeleteItemFromCartUsecase,
    private readonly updateItemFromCartUsecase: UpdateCartItemUsecase,
    private readonly getCartOwnedByUserUsecase: GetUserCartUsecase
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

  async updateCart(req: Request, res: Response) {
    try {
      const { id: userId } = (req as any)['user'];
      const { boxId, cartId } = req.params;
      const { quantity } = req.body;
      if (!quantity) {
        throw new InvariantError('Quantity cannot be empty');
      }
      if (!boxId || !cartId) {
        throw new InvariantError('Invalid cart id or box id (cannot be empty)');
      }
      const updatedItem = await this.updateItemFromCartUsecase.execute({
        boxId,
        cartId,
        quantity,
      });

      res.status(200).json({
        status: 'Success',
        message: 'item updated from cart',
        data: updatedItem,
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

  async getCartOwnedByUser(req: Request, res: Response) {
    try {
      const { id: userId } = (req as any)['user'];
      const cart = await this.getCartOwnedByUserUsecase.execute(userId);
      res.status(200).json({
        status: 'Success',
        message: 'Cart found',
        data: cart,
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
