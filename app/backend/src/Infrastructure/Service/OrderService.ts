import { Axios } from 'axios';
import { IOrderService } from '../../Application/Service/IOrderService';
import { IOrderRepository } from '../../Domain/Repository/IOrderRepository';
import { Order } from '../../Domain/Entity/Order/Order';
import { ConfigService } from './ConfigService';
import { ITransactionResponse } from '../../Domain/Types/types';

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
}
