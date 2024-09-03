import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { IOrderService } from '../../Service/IOrderService';

export class GetOrderStatusUsecase {
  constructor(private readonly orderService: IOrderService) {}

  async execute(orderId: string) {
    const orderStatus = await this.orderService.getOrderStatus(
      new OrderId(orderId)
    );
    return orderStatus;
  }
}
