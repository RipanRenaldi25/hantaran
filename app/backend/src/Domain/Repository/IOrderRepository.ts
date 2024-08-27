import { UserId } from '../Entity';
import { Order, StatusType } from '../Entity/Order/Order';
import { OrderId } from '../Entity/Order/OrderId';
import { PaymentMethodType } from '../Entity/Payment/AbstractPayment';

export interface IOrderRepository {
  getOrderById(id: OrderId): Promise<Order | null>;
  createOrder(order: Order): Promise<Order>;
  updateOrderStatus(orderId: OrderId, order: Order): Promise<Order>;
  getOrderListOwnedByUser(userId: UserId): Promise<
    {
      id: string;
      user_id: string;
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      full_name: string;
      phone_number: string;
      created_at: string;
      updated_at: string;
    }[]
  >;
  getOrders(): Promise<
    {
      id: string;
      user_id: string;
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      full_name: string;
      phone_number: string;
      created_at: string;
      updated_at: string;
    }[]
  >;

  getOrderItems(orderId: OrderId): Promise<
    {
      id: string;
      user_id: string;
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      full_name: string;
      phone_number: string;
      created_at: string;
      updated_at: string;
      box_id: string;
      box_name: string;
      box_quantity: number;
      box_image_url: string;
      box_price: number;
    }[]
  >;
}
