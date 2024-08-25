import { Box, BoxId } from '../Entity';
export class CartItem {
  private boxId: BoxId;
  private quantity: number;

  constructor(boxId: BoxId, quantity: number) {
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
