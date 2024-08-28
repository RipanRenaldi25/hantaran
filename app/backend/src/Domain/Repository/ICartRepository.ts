import { CreateAxiosDefaults } from 'axios';
import { Cart } from '../Cart/Cart';
import { CartId } from '../Cart/CartId';
import { BoxId, UserId } from '../Entity';
import { CartItem } from '../Cart/CartItem';

export interface ICartRepository {
  getCartByUserId(userId: UserId): Promise<Cart | null>;
  createCart(cart: Cart): Promise<Cart>;
  addItemToCart(cartId: CartId, cartItem: CartItem): Promise<void>;
  updateItemFromCart(cart: Cart): Promise<void>;
  deleteItemFromCart(
    cartId: CartId,
    boxId: BoxId,
    userId: UserId
  ): Promise<void>;
  checkIfCartIsOwnedByUser(userId: UserId, cartId: CartId): Promise<number>;
  checkIfItemIsExistOnCart(cartId: CartId, boxId: BoxId): Promise<boolean>;
  query(query: string, params?: string[]): Promise<any>;
  getCartItemByCartId(cartId: CartId): Promise<Cart | null>;
  getCartOwnedByUser(userId: UserId): Promise<
    | {
        cart_id: string;
        user_id: string;
        box_id: string;
        box_name: string;
        decoration_name: string;
        decoration_id: string;
        quantity: number;
        color_id: string;
        color_name: string;
      }[]
    | null
  >;
}
