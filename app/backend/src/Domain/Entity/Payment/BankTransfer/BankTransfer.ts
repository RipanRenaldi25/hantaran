import { Price } from '../../../ValueObject/Price';
import { OrderId } from '../../Order/OrderId';
import { AbstractPayment } from '../AbstractPayment';

export class BankTransfer extends AbstractPayment {
  constructor(amount: Price, orderId: OrderId) {
    super(amount, orderId, 'bank_transfer');
  }
}
