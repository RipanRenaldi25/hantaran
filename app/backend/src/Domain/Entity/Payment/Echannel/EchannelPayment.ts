import { Price } from '../../../ValueObject/Price';
import { OrderId } from '../../Order/OrderId';
import { AbstractPayment } from '../AbstractPayment';

export class EchannelPayment extends AbstractPayment {
  constructor(amount: Price, orderId: OrderId) {
    super(amount, orderId, 'echannel');
  }
}
