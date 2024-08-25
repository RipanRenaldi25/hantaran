import { CartId } from '../../../Domain/Cart/CartId';
import { BoxId } from '../../../Domain/Entity';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { ICartRepository } from '../../../Domain/Repository/ICartRepository';

export class UpdateCartItemUsecase {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(payload: { cartId: string; boxId: string; quantity: number }) {
    const cartId = new CartId(payload.cartId);
    const boxId = new BoxId(payload.boxId);
    const existingCart = await this.cartRepository.getCartItemByCartId(cartId);
    if (!existingCart) {
      throw new NotFoundError('Cart not found');
    }
    existingCart.updateBoxQuantity(boxId, payload.quantity);
    await this.cartRepository.updateItemFromCart(existingCart);
    return {
      cartId: existingCart.getId().toString,
      items: existingCart.getItems().map((item) => ({
        id: item.getBoxId().toString(),
        quantity: item.getQuantity(),
      })),
    };
  }
}
