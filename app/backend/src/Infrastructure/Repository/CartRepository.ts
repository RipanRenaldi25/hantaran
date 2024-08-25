import { Pool } from 'mysql2/promise';
import { Cart } from '../../Domain/Cart/Cart';
import { ICartRepository } from '../../Domain/Repository/ICartRepository';
import { CartId } from '../../Domain/Cart/CartId';
import { InvariantError } from '../../Domain/Exception/InvariantError';
import { BoxId, UserId } from '../../Domain/Entity';
import { Price } from '../../Domain/ValueObject/Price';
import { CartItem } from '../../Domain/Cart/CartItem';

export class CartRepository implements ICartRepository {
  private readonly dbConnection: Pool;

  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }
  async createCart(cart: Cart): Promise<Cart> {
    try {
      await this.dbConnection.query('START TRANSACTION');
      const query =
        'INSERT INTO carts (id, user_id) VALUES(?, ?) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP';
      await this.dbConnection.query(query, [
        cart.getId().toString(),
        cart.getUserId().toString(),
      ]);
      const queryToInsertItems = `INSERT INTO cart_items (cart_id, box_id, quantity) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE quantity = ?`;
      for (const item of cart.getItems()) {
        await this.dbConnection.query(queryToInsertItems, [
          cart.getId().toString(),
          item.getBoxId().toString(),
          item.getQuantity(),
          item.getQuantity(),
        ]);
      }
      await this.dbConnection.query('COMMIT');
      return cart;
    } catch (err: any) {
      console.log('ROLLBACK');
      await this.dbConnection.query('ROLLBACK');
      throw new InvariantError(err.message);
    }
  }

  async deleteCart(cartId: CartId, cartItem: CartItem): Promise<void> {
    const query = `DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?;`;
    await this.dbConnection.query(query, [
      cartId.toString(),
      cartItem.getBoxId().toString(),
    ]);
  }

  async addItemToCart(cartId: CartId, cartItem: CartItem): Promise<void> {}
  async updateItemFromCart(cartId: CartId, cartItem: CartItem): Promise<void> {}

  async getCartByUserId(userId: UserId): Promise<Cart | null> {
    try {
      const query = `SELECT carts.id, carts.user_id, boxes.id, boxes.name FROM carts JOIN cart_items ON carts.id = cart_items.cart_id JOIN boxes ON cart_items.product_id = boxes.id WHERE user_id = ?`;
      const [rows]: [any[], any[]] = await this.dbConnection.query(query, [
        userId.toString(),
      ]);
      const [cart] = rows;
      console.log(cart);
      const cartToReturn = new Cart(
        new CartId(cart.id),
        new UserId(cart.user_id)
      );
      return cartToReturn;
    } catch (err: any) {
      return null;
    }
  }
}
