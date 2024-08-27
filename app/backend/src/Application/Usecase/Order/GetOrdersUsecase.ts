import { IOrderRepository } from '../../../Domain/Repository/IOrderRepository';

export class GetOrdersUsecase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute() {
    const orders = await this.orderRepository.getOrders();
    return orders.map((order) => ({
      id: order.id,
      userId: order.user_id,
      price: order.price,
      status: order.status,
      paymentMethod: order.payment_method,
      fullName: order.full_name,
      phoneNumber: order.phone_number,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }));
  }
}
