import { Box, BoxId, UserId } from '../Entity';
import { Price } from '../ValueObject/Price';
import { CartId } from './CartId';
import { CartItem } from './CartItem';

export class Cart {
  private id: CartId;
  private userId: UserId;
  private cartItems: CartItem[];
  private total?: Price;

  constructor(id: CartId, userId: UserId) {
    this.id = id;
    this.userId = userId;
    this.cartItems = [];
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getItems() {
    return this.cartItems;
  }

  getTotal() {
    return this.total;
  }

  setTotal(total: Price) {
    this.total = total;
  }

  addItem(cartItem: CartItem) {
    if (
      this.cartItems.find(
        (item) => item.getBoxId().toString() === cartItem.getBoxId().toString()
      )
    ) {
      console.log('Cart item already exists, updating quantity');
      this.updateBoxQuantity(cartItem.getBoxId(), cartItem.getQuantity());
      return;
    }
    this.cartItems.push(cartItem);
  }

  removeBox(boxIdToDelete: BoxId) {
    this.cartItems.filter(
      (cartItem) => cartItem.getBoxId().toString() !== boxIdToDelete.toString()
    );
  }

  updateBoxQuantity(boxId: BoxId, quantity: number) {
    const cartItem = this.cartItems.find(
      (cartItem) => cartItem.getBoxId().toString() === boxId.toString()
    );
    if (cartItem) {
      cartItem.updateQuantity(quantity);
    }
  }

  setUserId(userId: UserId) {
    this.userId = userId;
  }
}
