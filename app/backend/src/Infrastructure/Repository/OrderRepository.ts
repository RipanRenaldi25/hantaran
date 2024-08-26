import { Pool } from 'mysql2/promise';
import { IOrderRepository } from '../../Domain/Repository/IOrderRepository';
import { Order } from '../../Domain/Entity/Order/Order';
import { OrderId } from '../../Domain/Entity/Order/OrderId';
import { UserId } from '../../Domain/Entity';
import { Price } from '../../Domain/ValueObject/Price';
import { BankTransfer } from '../../Domain/Entity/Payment/BankTransfer/BankTransfer';
import { QrisPayment } from '../../Domain/Entity/Payment/Qris/Qris';
import { EchannelPayment } from '../../Domain/Entity/Payment/Echannel/EchannelPayment';

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
  async updateOrder(orderId: OrderId, order: Order): Promise<void> {}
}
