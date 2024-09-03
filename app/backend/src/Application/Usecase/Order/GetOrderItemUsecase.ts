import { StatusType } from '../../../Domain/Entity/Order/Order';
import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { PaymentMethodType } from '../../../Domain/Entity/Payment/AbstractPayment';
import { IOrderRepository } from '../../../Domain/Repository/IOrderRepository';

export class GetOrderItemUsecase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(payload: { userId: string; orderId: string }) {
    const orderItems = await this.orderRepository.getOrderItems(
      new OrderId(payload.orderId)
    );
    return {
      boxes: orderItems.map((orderItem) => ({
        boxId: orderItem.box_id,
        boxName: orderItem.box_name,
        boxImageUrl: orderItem.box_image_url,
        boxQuantity: orderItem.box_quantity,
        boxPrice: orderItem.box_price,
      })),
      user: {
        id: payload.userId,
        fullName: orderItems[0].full_name,
        address: orderItems[0].address,
        phoneNumber: orderItems[0].phone_number,
      },
      order: {
        id: orderItems[0].id,
        paymentMethod: orderItems[0].payment_method,
        weddingDate: orderItems[0].wedding_date,
        manageStatus: orderItems[0].manage_status,
        paymentStatus: orderItems[0].status,
        createdAt: orderItems[0].created_at,
        updatedAt: orderItems[0].updated_at,
        totalPrice: orderItems[0].price,
        qrCodeUrl: orderItems[0].qr_code_url,
        va_number: orderItems[0].va_number,
        bill_key: orderItems[0].bill_key,
        biller_code: orderItems[0].biller_code,
      },
    };
  }
}
