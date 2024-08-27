import { Pool } from 'mysql2/promise';
import { IOrderRepository } from '../../Domain/Repository/IOrderRepository';
import { Order, StatusType } from '../../Domain/Entity/Order/Order';
import { OrderId } from '../../Domain/Entity/Order/OrderId';
import { UserId } from '../../Domain/Entity';
import { Price } from '../../Domain/ValueObject/Price';
import { BankTransfer } from '../../Domain/Entity/Payment/BankTransfer/BankTransfer';
import { QrisPayment } from '../../Domain/Entity/Payment/Qris/Qris';
import { EchannelPayment } from '../../Domain/Entity/Payment/Echannel/EchannelPayment';
import { PaymentMethodType } from '../../Domain/Entity/Payment/AbstractPayment';

export class OrderRepository implements IOrderRepository {
  constructor(private readonly dbConnection: Pool) {}

  async getOrderById(id: OrderId): Promise<Order | null> {
    try {
      const query = `SELECT * FROM orders WHERE id = ?`;
      const [results]: [any[], any[]] = await this.dbConnection.query(query, [
        id.toString(),
      ]);
      const [order] = results;
      const payment =
        order.payment_method === 'bank_transfer'
          ? new BankTransfer(new Price(order.price), new OrderId(order.id))
          : order.payment_method === 'qris'
          ? new QrisPayment(new Price(order.price), new OrderId(order.id))
          : new EchannelPayment(new Price(order.price), new OrderId(order.id));
      return new Order(
        order.id,
        new UserId(order.user_id),
        new Price(order.price),
        order.status,
        payment
      );
    } catch (err) {
      return null;
    }
  }
  async createOrder(order: Order): Promise<Order> {
    try {
      await this.dbConnection.query('START TRANSACTION');
      const createOrderQuery = `INSERT INTO orders (id, user_id, price, status, payment_method) VALUES (?, ?, ?, ?, ?)`;
      await this.dbConnection.query(createOrderQuery, [
        order.getId().toString(),
        order.getUserId().toString(),
        order.getAmount().getValue(),
        order.getStatus(),
        order.getPaymentMethod().getPaymentType(),
      ]);
      const createOrderItemQuery =
        'INSERT INTO order_items (order_id, box_id, quantity) VALUES (?, ?, ?)';

      for (const item of order.getOrderItem()) {
        await this.dbConnection.query(createOrderItemQuery, [
          order.getId().toString(),
          item.getBoxId().toString(),
          item.getQuantity(),
        ]);
      }

      await this.dbConnection.query('COMMIT');

      return order;
    } catch (err: any) {
      console.log('ROLLBACK');
      await this.dbConnection.query('ROLLBACK');
      throw new Error(err.message);
    }
  }

  async getOrderList(id: OrderId, userId: UserId): Promise<Order | null> {
    try {
      return {} as Order;
    } catch (err: any) {
      return null;
    }
  }
  async updateOrderStatus(orderId: OrderId, order: Order): Promise<Order> {
    console.log({ order, status: order.getStatus() });
    const query = `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      order.getStatus(),
      orderId.toString(),
    ]);
    console.log('OK');
    console.log(results);
    return order;
  }
  async getOrders(): Promise<
    {
      id: string;
      user_id: string;
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      full_name: string;
      phone_number: string;
      created_at: string;
      updated_at: string;
    }[]
  > {
    const query =
      'SELECT orders.id, orders.user_id, orders.price, orders.status, orders.payment_method, profiles.full_name, profiles.phone_number, orders.created_at, orders.updated_at FROM orders JOIN profiles ON orders.user_id = profiles.user_id';

    const [results]: [any[], any[]] = await this.dbConnection.query(query);

    return results;
  }

  async getOrderListOwnedByUser(userId: UserId): Promise<
    {
      id: string;
      user_id: string;
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      full_name: string;
      phone_number: string;
      created_at: string;
      updated_at: string;
    }[]
  > {
    const query =
      'SELECT orders.id, orders.user_id, orders.price, orders.status, orders.payment_method, profiles.full_name, profiles.phone_number, orders.created_at, orders.updated_at FROM orders JOIN profiles ON orders.user_id = profiles.user_id WHERE orders.user_id = ?';

    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      userId.toString(),
    ]);

    return results;
  }
}
