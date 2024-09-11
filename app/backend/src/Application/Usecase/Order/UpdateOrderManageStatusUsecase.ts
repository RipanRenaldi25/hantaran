import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { IOrderService } from '../../Service/IOrderService';

export class UpdateOrderManageStatusUsecase {
  constructor(private readonly orderSerice: IOrderService) {}

  async execute(
    manageStatus: 'processed' | 'completed' | 'unprocessed' | 'cancelled',
    orderId: string
  ) {
    await this.orderSerice.updateOrderManageStatus(
      new OrderId(orderId),
      manageStatus
    );
  }
}
