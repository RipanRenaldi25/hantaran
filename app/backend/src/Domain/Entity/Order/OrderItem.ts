import { InvariantError } from '../../Exception/InvariantError';
import { Price } from '../../ValueObject/Price';
import { BoxId } from '../Box';
import { UserId } from '../User';

export class OrderItem {
  constructor(
    private readonly boxId: BoxId,
    private readonly userId: UserId,
    private readonly quantity: number
  ) {
    if (quantity < 0) {
      throw new InvariantError('Quantity must be greater than equal 0');
    }
  }

  getBoxId(): BoxId {
    return this.boxId;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getQuantity(): number {
    return this.quantity;
  }
}
