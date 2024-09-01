import { UserId } from '../../Domain/Entity';
import { Order } from '../../Domain/Entity/Order/Order';
import { OrderId } from '../../Domain/Entity/Order/OrderId';
import { ITransactionResponse } from '../../Domain/Types/types';

export interface IOrderService {
  createOrder(
    order: Order,
    weddingDate: string,
    address: string
  ): Promise<{ createdOrder: Order; transaction: ITransactionResponse }>;
  updateOrderStatus(orderId: OrderId, order: Order): Promise<Order>;
  getOrderById(id: OrderId): Promise<Order | null>;
  getOrderListOwnedByUser(userId: UserId): Promise<Order[]>;
  getOrders(): Promise<Order[]>;
}
