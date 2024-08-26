import { Price } from '../../../ValueObject/Price';
import { OrderId } from '../../Order/OrderId';
import { AbstractPayment } from '../AbstractPayment';

export class QrisPayment extends AbstractPayment {
  constructor(amount: Price, orderId: OrderId) {
    super(amount, orderId, 'qris');
  }
}
