import { UserId } from '../../../Domain/Entity';
import { IOrderRepository } from '../../../Domain/Repository/IOrderRepository';

export class GetOrderOwnedByUserUsecase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(userId: string) {
    const orders = await this.orderRepository.getOrderListOwnedByUser(
      new UserId(userId)
    );

    return orders;
  }
}
