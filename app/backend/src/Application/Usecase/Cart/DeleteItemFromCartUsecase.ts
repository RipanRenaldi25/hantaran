import { CartId } from '../../../Domain/Cart/CartId';
import { BoxId, UserId } from '../../../Domain/Entity';
import { ICartRepository } from '../../../Domain/Repository/ICartRepository';

export class DeleteItemFromCartUsecase {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(payload: { userId: string; cartId: string; boxId: string }) {
    console.log({ payload });
    await this.cartRepository.deleteItemFromCart(
      new CartId(payload.cartId),
      new BoxId(payload.boxId),
      new UserId(payload.userId)
    );

    return {
      id: payload.userId,
    };
  }
}
