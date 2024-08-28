import { UserId } from '../../../Domain/Entity';
import { ICartRepository } from '../../../Domain/Repository/ICartRepository';

export class GetUserCartUsecase {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(userId: string) {
    const idUser = new UserId(userId);
    const cartsOwnedByUser = await this.cartRepository.getCartOwnedByUser(
      idUser
    );
    return cartsOwnedByUser;
  }
}
