import { StatusType } from '../../../Domain/Entity/Order/Order';
import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { PaymentMethodType } from '../../../Domain/Entity/Payment/AbstractPayment';
import { IOrderRepository } from '../../../Domain/Repository/IOrderRepository';

export class GetOrderItemUsecase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(payload: { userId: string; orderId: string }): Promise<{
    totalPrice: number;
    boxes: {
      id: string;
      user_id: string;
      status: StatusType;
      paymentMethod: PaymentMethodType;
      fullName: string;
      phoneNumber: string;
      createdAt: string;
      updatedAt: string;
      boxId: string;
      boxName: string;
      boxQuantity: number;
      boxImageUrl: string;
      boxPrice: number;
    }[];
  }> {
    const orderItems = await this.orderRepository.getOrderItems(
      new OrderId(payload.orderId)
    );
    return {
      totalPrice: orderItems[0].price,
      boxes: orderItems.map((orderItem) => ({
        boxId: orderItem.box_id,
        boxName: orderItem.box_name,
        boxImageUrl: orderItem.box_image_url,
        boxQuantity: orderItem.box_quantity,
        createdAt: orderItem.created_at,
        fullName: orderItem.full_name,
        id: orderItem.id,
        paymentMethod: orderItem.payment_method,
        phoneNumber: orderItem.phone_number,
        boxPrice: orderItem.box_price,
        status: orderItem.status,
        updatedAt: orderItem.updated_at,
        user_id: orderItem.user_id,
      })),
    };
  }
}
