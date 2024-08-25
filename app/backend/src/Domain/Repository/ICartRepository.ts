import { CreateAxiosDefaults } from 'axios';
import { Cart } from '../Cart/Cart';
import { CartId } from '../Cart/CartId';
import { UserId } from '../Entity';
import { CartItem } from '../Cart/CartItem';

export interface ICartRepository {
  getCartByUserId(userId: UserId): Promise<Cart | null>;
  createCart(cart: Cart): Promise<Cart>;
  addItemToCart(cartId: CartId, cartItem: CartItem): Promise<void>;
  updateItemFromCart(cartId: CartId, cartItem: CartItem): Promise<void>;
  deleteCart(cartId: CartId, cartItem: CartItem): Promise<void>;
}
