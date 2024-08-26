import { Box, BoxId } from '../Entity';
import { InvariantError } from '../Exception/InvariantError';
export class CartItem {
  private boxId: BoxId;
  private quantity: number;

  constructor(boxId: BoxId, quantity: number) {
    if (quantity < 0) {
      throw new InvariantError('Quantity must be greater than equal 0');
    }
    this.boxId = boxId;
    this.quantity = quantity;
  }

  getBoxId(): BoxId {
    return this.boxId;
  }

  getQuantity(): number {
    return this.quantity;
  }

  updateQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
