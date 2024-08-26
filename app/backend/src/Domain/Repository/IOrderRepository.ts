import { UserId } from '../Entity';
import { Order } from '../Entity/Order/Order';
import { OrderId } from '../Entity/Order/OrderId';

export interface IOrderRepository {
  getOrderById(id: OrderId): Promise<Order | null>;
  createOrder(order: Order): Promise<Order>;
  updateOrderStatus(orderId: OrderId, order: Order): Promise<Order>;
  getOrderList(id: OrderId, userId: UserId): Promise<Order | null>;
}
