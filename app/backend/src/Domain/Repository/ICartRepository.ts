import { CreateAxiosDefaults } from 'axios';
import { Cart } from '../Cart/Cart';
import { CartId } from '../Cart/CartId';
import { BoxId, UserId } from '../Entity';
import { CartItem } from '../Cart/CartItem';

export interface ICartRepository {
  getCartByUserId(userId: UserId): Promise<Cart | null>;
  createCart(cart: Cart): Promise<Cart>;
  addItemToCart(cartId: CartId, cartItem: CartItem): Promise<void>;
  updateItemFromCart(cartId: CartId, cartItem: CartItem): Promise<void>;
  deleteItemFromCart(
    cartId: CartId,
    boxId: BoxId,
    userId: UserId
  ): Promise<void>;
}
