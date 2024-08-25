import { CartId } from '../../../Domain/Cart/CartId';
import { BoxId, UserId } from '../../../Domain/Entity';
import { ForbiddenError } from '../../../Domain/Exception/ForbiddenError';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { ICartRepository } from '../../../Domain/Repository/ICartRepository';

export class DeleteItemFromCartUsecase {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(payload: { userId: string; cartId: string; boxId: string }) {
    const userId = new UserId(payload.userId);
    const cartId = new CartId(payload.cartId);
    const boxId = new BoxId(payload.boxId);
    const isCartOwnedByUser =
      await this.cartRepository.checkIfCartIsOwnedByUser(userId, cartId);
    if (!isCartOwnedByUser) {
      throw new ForbiddenError('Cart is not owned by user');
    }
    const isItemExistOnCart =
      await this.cartRepository.checkIfItemIsExistOnCart(cartId, boxId);
    if (!isItemExistOnCart) {
      throw new NotFoundError('Item is not exist on cart');
    }
    if (isCartOwnedByUser > 1) {
      const query = `DELETE FROM cart_items WHERE cart_id = ? AND box_id = ?`;
      await this.cartRepository.query(query, [
        cartId.toString(),
        boxId.toString(),
      ]);
    } else {
      await this.cartRepository.deleteItemFromCart(cartId, boxId, userId);
    }

    return {
      id: payload.userId,
    };
  }
}
