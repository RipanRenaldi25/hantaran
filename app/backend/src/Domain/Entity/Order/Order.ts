import { Price } from '../../ValueObject/Price';
import { AbstractPayment } from '../Payment/AbstractPayment';
import { UserId } from '../User';
import { OrderId } from './OrderId';
import { OrderItem } from './OrderItem';

export type StatusType =
  | 'pending'
  | 'settlement'
  | 'canceled'
  | 'expired'
  | 'failed';

export class Order {
  constructor(
    private readonly id: OrderId,
    private readonly userId: UserId,
    private amount: Price,
    private status: StatusType,
    private paymentMethod: AbstractPayment,
    private items: OrderItem[] = []
  ) {
    this.items = items;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  getPaymentMethod() {
    return this.paymentMethod;
  }

  setStatus(status: StatusType) {
    this.status = status;
  }

  setPaymentMethod(paymentMethod: AbstractPayment) {
    this.paymentMethod = paymentMethod;
  }

  setAmount(amount: Price) {
    this.amount = amount;
    this.paymentMethod.updateAmount(amount);
  }

  getOrderItem() {
    return this.items;
  }

  addOrderItem(item: OrderItem) {
    const index = this.items?.findIndex(
      (orderItem) =>
        orderItem.getBoxId().toString() === item.getBoxId().toString()
    );
    if (index === -1) {
      this.items.push(item);
      return;
    } else {
      this.items[index] = item;
    }
  }
}
