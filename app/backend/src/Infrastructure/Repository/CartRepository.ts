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
      throw new Error(err.message);
    }
  }

  async deleteItemFromCart(
    cartId: CartId,
    boxId: BoxId,
    userId: UserId
  ): Promise<void> {
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
    } catch (err: any) {
      await this.dbConnection.query('ROLLBACK');
      throw new Error(err.message);
    }
  }

  async query(query: string, params?: string[]) {
    const [rows] = await this.dbConnection.query(query, params);
    return rows;
  }

  async checkIfCartIsOwnedByUser(
    userId: UserId,
    cartId: CartId
  ): Promise<number> {
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

  async checkIfItemIsExistOnCart(
    cartId: CartId,
    boxId: BoxId
  ): Promise<boolean> {
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
  async updateItemFromCart(cart: Cart): Promise<void> {
    try {
      const query = `UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND box_id = ?`;
      for (const item of cart.getItems()) {
        await this.dbConnection.query(query, [
          item.getQuantity(),
          cart.getId().toString(),
          item.getBoxId().toString(),
        ]);
      }
    } catch (err: any) {
      throw new InvariantError(err.message);
    }
  }

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

  async getCartItemByCartId(cartId: CartId): Promise<Cart | null> {
    try {
      const query = `SELECT carts.id, carts.user_id, boxes.id as box_id, boxes.name, cart_items.quantity FROM carts JOIN cart_items ON carts.id = cart_items.cart_id JOIN boxes ON cart_items.box_id = boxes.id WHERE carts.id = ?`;
      const [rows]: [any[], any[]] = await this.dbConnection.query(query, [
        cartId.toString(),
      ]);
      console.log({ rows });
      const [cart] = rows;
      const cartToReturn = new Cart(
        new CartId(cart.id),
        new UserId(cart.user_id)
      );
      for (const item of rows) {
        cartToReturn.addItem(
          new CartItem(new BoxId(item.box_id), item.quantity)
        );
      }

      return cartToReturn;
    } catch (err) {
      return null;
    }
  }
  async getCartOwnedByUser(userId: UserId): Promise<
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
  > {
    try {
      const query = `SELECT carts.id as cart_id, carts.user_id as user_id, boxes.id as box_id, boxes.name as box_name, decorations.name as decoration_name, decorations.id as decoration_id, cart_items.quantity as quantity, colors.id as color_id, colors.name as color_name FROM carts JOIN cart_items ON carts.id = cart_items.cart_id JOIN boxes ON cart_items.box_id = boxes.id  JOIN box_colors ON boxes.id = box_colors.box_id JOIN colors ON box_colors.color_id = colors.id JOIN box_decorations ON boxes.id = box_decorations.box_id JOIN decorations ON box_decorations.decoration_id = decorations.id WHERE user_id = ?`;
      const [results]: [any[], any[]] = await this.dbConnection.query(query, [
        userId.toString(),
      ]);
      return results;
    } catch (err) {
      return null;
    }
  }
}
