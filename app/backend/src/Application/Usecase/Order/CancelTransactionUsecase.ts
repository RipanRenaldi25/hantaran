import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { IOrderService } from '../../Service/IOrderService';

export class CancelTransactionUsecase {
  constructor(private readonly orderService: IOrderService) {}

  async execute(orderId: string) {
    const order = await this.orderService.cancelOrder(new OrderId(orderId));
    return order;
  }
}
