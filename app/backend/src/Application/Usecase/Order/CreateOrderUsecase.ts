import { BoxId, UserId } from '../../../Domain/Entity';
import { Order } from '../../../Domain/Entity/Order/Order';
import { OrderId } from '../../../Domain/Entity/Order/OrderId';
import { OrderItem } from '../../../Domain/Entity/Order/OrderItem';
import { BankTransfer } from '../../../Domain/Entity/Payment/BankTransfer/BankTransfer';
import { EchannelPayment } from '../../../Domain/Entity/Payment/Echannel/EchannelPayment';
import { QrisPayment } from '../../../Domain/Entity/Payment/Qris/Qris';
import { NotFoundError } from '../../../Domain/Exception/NotFoundError';
import { IUserRepository } from '../../../Domain/Repository/IUserRepository';
import { Price } from '../../../Domain/ValueObject/Price';
import { IOrderService } from '../../Service/IOrderService';

export class CreateOrderUsecase {
  constructor(
    private readonly orderService: IOrderService,
    private readonly idGenerator: () => string,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(payload: {
    userId: string;
    orderItems: {
      boxId: string;
      quantity: number;
      price: number;
      name: string;
    }[];
    price: number;
    paymentMethod: 'bank_transfer' | 'qris' | 'echannel';
    acquirer?: 'gopay' | 'airpay shopee';
    billInfo1?: string;
    billInfo2?: string;
    bankName?: string;
    vaNumber?: string;
    weddingDate: string;
    address?: string;
  }) {
    const orderId = new OrderId(this.idGenerator());
    const paymentMethod =
      payload.paymentMethod === 'bank_transfer'
        ? new BankTransfer(
            new Price(payload.price),
            new OrderId(this.idGenerator())
          )
        : payload.paymentMethod === 'qris'
        ? new QrisPayment(
            new Price(payload.price),
            new OrderId(this.idGenerator())
          )
        : new EchannelPayment(
            new Price(payload.price),
            new OrderId(this.idGenerator())
          );
    if (paymentMethod.getPaymentType() === 'qris') {
      paymentMethod.addTransactionConfiguration({
        qris: {
          acquirer: payload?.acquirer || 'gopay',
        },
      });
    }
    if (paymentMethod.getPaymentType() === 'echannel') {
      paymentMethod.addTransactionConfiguration({
        echannel: {
          billInfo1: payload?.billInfo1 || '',
          billInfo2: payload?.billInfo2 || '',
        },
      });
    }
    if (paymentMethod.getPaymentType() === 'bank_transfer') {
      paymentMethod.addTransactionConfiguration({
        bankTransfer: {
          bank: payload.bankName || '',
          va_number: payload.vaNumber || '',
        },
      });
    }
    const customer = await this.userRepository.getUserWithProfileAndAddress(
      new UserId(payload.userId)
    );
    if (!customer) {
      throw new NotFoundError('User not found');
    }
    paymentMethod.addTransactionConfiguration({
      transactionDetails: {
        grossAmount: payload.price,
        orderId: orderId.toString(),
      },
      customerDetails: {
        address: customer.street,
        email: customer.email,
        first_name: customer.fullName,
        last_name: customer.fullName,
        phone: customer.phoneNumber,
        shipping_address: {
          address: customer.street,
          city: customer.city,
          first_name: customer.fullName,
          last_name: customer.fullName,
          phone: customer.phoneNumber,
          postal_code: customer.postalCode,
        },
      },
    });
    const order = new Order(
      orderId,
      new UserId(payload.userId),
      new Price(payload.price || 0),
      'pending',
      paymentMethod
    );
    let totalPrice = 0;
    for (const item of payload.orderItems) {
      const orderItem = new OrderItem(
        new BoxId(item.boxId),
        new UserId(payload.userId),
        item.quantity
      );
      order.addOrderItem(orderItem);
      order.getPaymentMethod().addTransactionConfiguration({
        itemDetails: [
          ...(order.getPaymentMethod().getTransactionConfiguration()
            .itemDetails || []),
          {
            id: item.boxId,
            quantity: item.quantity,
            name: item.name,
            price: item.price,
          },
        ],
      });
      totalPrice += item.price * item.quantity;
    }
    order.setAmount(new Price(totalPrice));

    const { createdOrder, transaction } = await this.orderService.createOrder(
      order,
      payload.weddingDate,
      payload.address || customer.details
    );
    const returnedPayload = {
      id: createdOrder.getId().toString(),
      fullName: customer.fullName,
      city: customer.city,
      details: customer.details || '',
      price: createdOrder.getAmount().getValue(),
      paymentMethod: createdOrder.getPaymentMethod().getPaymentType(),
      userId: createdOrder.getUserId().toString(),
      items: createdOrder.getOrderItem().map((orderItem) => ({
        boxId: orderItem.getBoxId().toString(),
        quantity: orderItem.getQuantity(),
      })),
      paymentType: transaction.payment_type,
      status: transaction.transaction_status,
      address: payload.address || customer.details,
      weddingDate: payload.weddingDate,
    };

    if (createdOrder.getPaymentMethod().getPaymentType() === 'qris') {
      return {
        ...structuredClone(returnedPayload),
        qrCode: transaction.actions[0].url,
      };
    }
    if (createdOrder.getPaymentMethod().getPaymentType() === 'echannel') {
      return {
        ...returnedPayload,
        billKey: transaction.bill_key,
        billerCode: transaction.biller_code,
      };
    }
    if (createdOrder.getPaymentMethod().getPaymentType() === 'bank_transfer') {
      return {
        ...returnedPayload,
        vaNumbers: transaction.va_numbers,
      };
    }
  }
}
