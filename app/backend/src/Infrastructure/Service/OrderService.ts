import { Axios } from 'axios';
import { IOrderService } from '../../Application/Service/IOrderService';
import { IOrderRepository } from '../../Domain/Repository/IOrderRepository';
import { Order } from '../../Domain/Entity/Order/Order';
import { ConfigService } from './ConfigService';
import { ITransactionResponse } from '../../Domain/Types/types';
import { OrderId } from '../../Domain/Entity/Order/OrderId';
import { NotFoundError } from '../../Domain/Exception/NotFoundError';
import { UserId } from '../../Domain/Entity';
import { Price } from '../../Domain/ValueObject/Price';
import { BankTransfer } from '../../Domain/Entity/Payment/BankTransfer/BankTransfer';
import { EchannelPayment } from '../../Domain/Entity/Payment/Echannel/EchannelPayment';
import { QrisPayment } from '../../Domain/Entity/Payment/Qris/Qris';

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly axiosClient: Axios,
    private readonly configService: ConfigService
  ) {}

  async createOrder(
    order: Order
  ): Promise<{ createdOrder: Order; transaction: ITransactionResponse }> {
    try {
      const createdOrder = await this.orderRepository.createOrder(order);
      const response = await this.axiosClient.post(
        `${this.configService.get('MIDTRANS_BASE_URL')}/charge`,
        order.getPaymentMethod().mapToFetch(),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.configService.get('MIDTRANS_SERVER_KEY')}:`
            ).toString('base64')}`,
          },
        }
      );
      const { data }: { data: ITransactionResponse } = response;
      return {
        createdOrder,
        transaction: {
          ...data,
          va_numbers:
            order.getPaymentMethod().getTransactionConfiguration().bankTransfer
              ?.bank === 'permata'
              ? [
                  {
                    bank: 'permata',
                    va_number: data.permata_va_number,
                  },
                ]
              : data.va_numbers,
          bill_key:
            order.getPaymentMethod().getPaymentType() === 'echannel'
              ? data.bill_key
              : '',
          biller_code:
            order.getPaymentMethod().getPaymentType() === 'echannel'
              ? data.biller_code
              : '',
        },
      };
    } catch (err: any) {
      console.log({ err: err.message });
      throw new Error(err.message);
    }
  }

  async getOrderById(id: OrderId): Promise<Order | null> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    return order;
  }

  async updateOrderStatus(orderId: OrderId, order: Order): Promise<Order> {
    const updatedOrder = await this.orderRepository.updateOrderStatus(
      orderId,
      order
    );
    return updatedOrder;
  }

  async getOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.getOrders();
    return orders.map((order) => {
      const paymentMethod =
        order.payment_method === 'bank_transfer'
          ? new BankTransfer(new Price(order.price), new OrderId(order.id))
          : order.payment_method === 'echannel'
          ? new EchannelPayment(new Price(order.price), new OrderId(order.id))
          : new QrisPayment(new Price(order.price), new OrderId(order.id));

      return new Order(
        new OrderId(order.id),
        new UserId(order.user_id),
        new Price(order.price),
        order.status,
        paymentMethod
      );
    });
  }

  async getOrderListOwnedByUser(userId: UserId): Promise<Order[]> {
    const orders = await this.orderRepository.getOrderListOwnedByUser(userId);
    return orders.map((order) => {
      const paymentMethod =
        order.payment_method === 'bank_transfer'
          ? new BankTransfer(new Price(order.price), new OrderId(order.id))
          : order.payment_method === 'echannel'
          ? new EchannelPayment(new Price(order.price), new OrderId(order.id))
          : new QrisPayment(new Price(order.price), new OrderId(order.id));
      return new Order(
        new OrderId(order.id),
        new UserId(order.user_id),
        new Price(order.price),
        order.status,
        paymentMethod
      );
    });
  }
}
