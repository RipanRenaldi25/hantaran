import { UserId } from '../Entity';
import { Order, StatusType } from '../Entity/Order/Order';
import { OrderId } from '../Entity/Order/OrderId';
import { PaymentMethodType } from '../Entity/Payment/AbstractPayment';

export interface IOrderRepository {
  getOrderById(id: OrderId): Promise<Order | null>;
  createOrder(
    order: Order,
    weddingDate: string,
    address: string
  ): Promise<Order>;
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
      address: string;
      manage_status: string;
      wedding_date: string;
      qr_code_url: string;
      va_number: string;
      bill_key: string;
      biller_code: string;
    }[]
  >;
  updateOrder(
    orderId: OrderId,
    data: Partial<{
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      address: string;
      weddings_date: string;
      manage_status: string;
      qr_code_url: string;
      va_number: string;
      bill_key: string;
      biller_code: string;
      expired_at: string;
    }>
    // ): Promise<{
    //   price: number;
    //   status: StatusType;
    //   payment_method: PaymentMethodType;
    //   address: string;
    //   weddings_date: string;
    //   manage_status: string;
    //   qr_code_url: string;
    //   va_number: string;
    //   bill_info_1: string;
    //   bill_info_2: string;
    // }>;
  ): Promise<void>;
}
