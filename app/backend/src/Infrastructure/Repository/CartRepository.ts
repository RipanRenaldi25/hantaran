import { Pool } from 'mysql2/promise';
import { Cart } from '../../Domain/Cart/Cart';
import { ICartRepository } from '../../Domain/Repository/ICartRepository';
import { CartId } from '../../Domain/Cart/CartId';
import { InvariantError } from '../../Domain/Exception/InvariantError';
import { BoxId, UserId } from '../../Domain/Entity';
import { Price } from '../../Domain/ValueObject/Price';
import { CartItem } from '../../Domain/Cart/CartItem';
import { ForbiddenError } from '../../Domain/Exception/ForbiddenError';
import { NotFoundError } from '../../Domain/Exception/NotFoundError';

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

  async deleteItemFromCart(
    cartId: CartId,
    boxId: BoxId,
    userId: UserId
  ): Promise<void> {
    const isCartOwnedByUser = await this.checkIfCartIsOwnedByUser(
      userId,
      cartId
    );
    if (!isCartOwnedByUser) {
      throw new ForbiddenError('Cart is not owned by user');
    }
    const isItemExistOnCart = await this.checkIfItemIsExistOnCart(
      cartId,
      boxId
    );
    if (!isItemExistOnCart) {
      throw new NotFoundError('Item is not exist on cart');
    }
    if (isCartOwnedByUser > 1) {
      const query = `DELETE FROM cart_items WHERE cart_id = ? AND box_id = ?`;
      const [result] = await this.dbConnection.query(query, [
        cartId.toString(),
        boxId.toString(),
      ]);
      return;
    }
    try {
      await this.dbConnection.query('START TRANSACTION');
      const query = `DELETE FROM cart_items WHERE cart_id = ? AND box_id = ?`;
      const [result] = await this.dbConnection.query(query, [
        cartId.toString(),
        boxId.toString(),
      ]);
      await this.dbConnection.query('DELETE FROM carts WHERE id=?', [
        cartId.toString(),
      ]);
      await this.dbConnection.query('COMMIT');
    } catch (err) {
      await this.dbConnection.query('ROLLBACK');
    }
  }

  async checkIfCartIsOwnedByUser(userId: UserId, cartId: CartId) {
    try {
      const query =
        'SELECT * FROM carts JOIN cart_items ON carts.id=cart_items.cart_id WHERE user_id=? AND cart_id=?';
      const [result]: [any[], any[]] = await this.dbConnection.query(query, [
        userId.toString(),
        cartId.toString(),
      ]);
      return result.length;
    } catch (err: any) {
      return [].length;
    }
  }

  async checkIfItemIsExistOnCart(cartId: CartId, boxId: BoxId) {
    const query = 'SELECT * FROM cart_items WHERE cart_id = ? AND box_id = ?';
    const [result]: [any[], any[]] = await this.dbConnection.query(query, [
      cartId.toString(),
      boxId.toString(),
    ]);
    if (!result.length) {
      return false;
    }
    return true;
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
