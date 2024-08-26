import { Order } from '../../Domain/Entity/Order/Order';
import { OrderId } from '../../Domain/Entity/Order/OrderId';
import { ITransactionResponse } from '../../Domain/Types/types';

export interface IOrderService {
  createOrder(
    order: Order
  ): Promise<{ createdOrder: Order; transaction: ITransactionResponse }>;
  updateOrderStatus(orderId: OrderId, order: Order): Promise<Order>;
  getOrderById(id: OrderId): Promise<Order | null>;
}
