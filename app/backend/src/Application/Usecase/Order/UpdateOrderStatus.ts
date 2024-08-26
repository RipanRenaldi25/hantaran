import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IOrderService } from '../../Service/IOrderService';

export class UpdateOrderStatusUsecase {
  constructor(private readonly orderService: IOrderService) {}

  async execute(payload: {
    orderId: string;
    status: 'pending' | 'settlement' | 'canceled' | 'expired' | 'failed';
  }) {
    const orderId = new OrderId(payload.orderId);
    const existingOrder = await this.orderService.getOrderById(orderId);
    if (!existingOrder) {
      throw new NotFoundError('Order not found');
    }
    existingOrder.setStatus(payload.status);

    const updatedOrder = await this.orderService.updateOrderStatus(
      orderId,
      existingOrder
    );
    return {
      id: updatedOrder.getId().toString,
      status: updatedOrder.getStatus(),
      paymentMethod: updatedOrder.getPaymentMethod().toString(),
    };
  }
}
