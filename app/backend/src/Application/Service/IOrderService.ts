import { Order } from '../../Domain/Entity/Order/Order';
import { ITransactionResponse } from '../../Domain/Types/types';

export interface IOrderService {
  createOrder(
    order: Order
  ): Promise<{ createdOrder: Order; transaction: ITransactionResponse }>;
}
