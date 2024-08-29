import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IOrderRepository } from '../../../Domain/Repository/IOrderRepository';

export class GetOrderByIdUsecase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string) {
    const order = await this.orderRepository.getOrderById(new OrderId(orderId));
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    return {
      id: order?.getId().toString(),
      user: order.getUserId().toString(),
      price: order.getAmount().getValue(),
      status: order.getStatus(),
      paymentMethod: order.getPaymentMethod().getPaymentType(),
    };
  }
}
