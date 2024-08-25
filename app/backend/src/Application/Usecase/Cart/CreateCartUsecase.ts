import { Cart } from '../../../Domain/Cart/Cart';
import { CartId } from '../../../Domain/Cart/CartId';
import { CartItem } from '../../../Domain/Cart/CartItem';
import { BoxId, UserId } from '../../../Domain/Entity';
import { InvariantError } from '../../../Domain/Exception/InvariantError';
import { ICartRepository } from '../../../Domain/Repository/ICartRepository';

export class CreateCartUsecase {
  private cartRepository: ICartRepository;

  constructor(
    cartRepository: ICartRepository,
    private readonly idGenerator: () => string
  ) {
    this.cartRepository = cartRepository;
  }
  async execute(payload: {
    userId: string;
    items: { boxId: string; quantity: number }[];
  }) {
    if (!payload.items.length) {
      throw new InvariantError('Cart items cannot be empty');
    }
    const newCart = new Cart(
      new CartId(this.idGenerator()),
      new UserId(payload.userId)
    );

    for (const item of payload.items) {
      const newCartItem = new CartItem(new BoxId(item.boxId), item.quantity);
      newCart.addItem(newCartItem);
    }

    const cart = await this.cartRepository.createCart(newCart);

    return {
      id: cart.getId().toString(),
      userId: cart.getUserId().toString(),
      items: cart.getItems().map((item) => ({
        boxId: item.getBoxId().toString(),
        quantity: item.getQuantity(),
      })),
    };
  }
}
