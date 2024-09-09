import { Pool } from 'mysql2/promise';
import { IOrderRepository } from '../../Domain/Repository/IOrderRepository';
import { Order, StatusType } from '../../Domain/Entity/Order/Order';
import { OrderId } from '../../Domain/Entity/Order/OrderId';
import { BoxId, UserId } from '../../Domain/Entity';
import { Price } from '../../Domain/ValueObject/Price';
import { BankTransfer } from '../../Domain/Entity/Payment/BankTransfer/BankTransfer';
import { QrisPayment } from '../../Domain/Entity/Payment/Qris/Qris';
import { EchannelPayment } from '../../Domain/Entity/Payment/Echannel/EchannelPayment';
import { PaymentMethodType } from '../../Domain/Entity/Payment/AbstractPayment';
import { OrderItem } from '../../Domain/Entity/Order/OrderItem';

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
      // const orderItemQuery = `SELECT order_items.box_id, order_items.quantity, boxes.name AS box_name, boxes.price, boxes.image_url AS box_image_url FROM order_items JOIN boxes ON order_items.box_id = boxes.id WHERE order_id = ?`;
      // const [orderItemsResult]: [any[], any[]] = await this.dbConnection.query(
      //   orderItemQuery,
      //   [id.toString()]
      // );
      // const orderItems = orderItemsResult.map(
      //   (item) =>
      //     new OrderItem(
      //       new BoxId(item.box_id),
      //       new UserId(order.user_id),
      //       item.quantity
      //     )
      // );
      return new Order(
        order.id,
        new UserId(order.user_id),
        new Price(order.price),
        order.status,
        payment
        // orderItems
      );
    } catch (err) {
      return null;
    }
  }
  async createOrder(
    order: Order,
    weddingDate: string,
    address: string
  ): Promise<Order> {
    try {
      await this.dbConnection.query('START TRANSACTION');
      const createOrderQuery = `INSERT INTO orders (id, user_id, price, status, payment_method, date, address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await this.dbConnection.query(createOrderQuery, [
        order.getId().toString(),
        order.getUserId().toString(),
        order.getAmount().getValue(),
        order.getStatus(),
        order.getPaymentMethod().getPaymentType(),
        weddingDate,
        address,
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
    const query = `UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP, manage_status = ? WHERE id = ?`;
    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      order.getStatus(),
      'unprocessed',
      orderId.toString(),
    ]);
    console.log('OK');
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
      address: string;
      date: string;
      manage_status: string;
      expired_at: string;
    }[]
  > {
    // const query =
    //   'SELECT orders.id, orders.user_id, orders.price, orders.status, orders.payment_method, profiles.full_name, profiles.phone_number, orders.created_at, orders.updated_at FROM orders JOIN profiles ON orders.user_id = profiles.user_id';
    const query =
      'SELECT * FROM orders JOIN profiles ON orders.user_id = profiles.user_id';

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
      address: string;
      wedding_date: string;
      manage_status: string;
    }[]
  > {
    const query =
      'SELECT orders.id, orders.user_id, orders.manage_status, orders.date, orders.address, orders.price, orders.status, orders.payment_method, profiles.full_name, profiles.phone_number, orders.created_at, orders.updated_at FROM orders JOIN profiles ON orders.user_id = profiles.user_id WHERE orders.user_id = ?';

    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      userId.toString(),
    ]);

    return results;
  }

  async getOrderItems(orderId: OrderId): Promise<
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
      box_id: string;
      box_name: string;
      box_quantity: number;
      box_image_url: string;
      box_price: number;
      address: string;
      manage_status: string;
      wedding_date: string;
      qr_code_url: string;
      va_number: string;
      bill_key: string;
      biller_code: string;
    }[]
  > {
    const query =
      'SELECT orders.id, orders.qr_code_url, orders.va_number, orders.bill_key, orders.biller_code, orders.user_id, orders.manage_status, orders.date AS wedding_date, orders.address, orders.price, orders.status, orders.payment_method, profiles.full_name, profiles.phone_number, boxes.id as box_id, boxes.name as box_name, boxes.image_url as box_image_url, order_items.quantity as box_quantity, boxes.price as box_price FROM orders JOIN profiles ON orders.user_id = profiles.user_id JOIN order_items ON orders.id = order_items.order_id JOIN boxes ON order_items.box_id = boxes.id WHERE orders.id = ?';
    const [results]: [any[], any[]] = await this.dbConnection.query(query, [
      orderId.toString(),
    ]);
    return results;
  }

  async updateOrder(
    orderId: OrderId,
    data: Partial<{
      price: number;
      status: StatusType;
      payment_method: PaymentMethodType;
      address: string;
      weddings_date: string;
      manage_status: string;
      qr_code_url: string;
      va_number: string;
      bill_key: string;
      biller_code: string;
      expired_at: string;
    }>
  ): Promise<void> {
    try {
      const columnToUpdate = [];
      const valueToUpdate = [];

      if (data.price) {
        columnToUpdate.push('price = ?');
        valueToUpdate.push(data.price);
      }

      if (data.status) {
        columnToUpdate.push('status = ?');
        valueToUpdate.push(data.status);
      }

      if (data.payment_method) {
        columnToUpdate.push('payment_method');
        valueToUpdate.push(data.payment_method);
      }

      if (data.address) {
        columnToUpdate.push('address = ?');
        valueToUpdate.push(data.address);
      }

      if (data.weddings_date) {
        columnToUpdate.push('weddings_date = ?');
        valueToUpdate.push(data.weddings_date);
      }

      if (data.manage_status) {
        columnToUpdate.push('manage_status = ?');
        valueToUpdate.push(data.manage_status);
      }

      if (data.qr_code_url) {
        columnToUpdate.push('qr_code_url = ?');
        valueToUpdate.push(data.qr_code_url);
      }

      if (data.va_number) {
        columnToUpdate.push('va_number = ?');
        valueToUpdate.push(data.va_number);
      }

      if (data.bill_key && data.biller_code) {
        columnToUpdate.push('bill_key = ?');
        columnToUpdate.push('biller_code = ?');
        valueToUpdate.push(data.bill_key);
        valueToUpdate.push(data.biller_code);
      }
      if (data.expired_at) {
        columnToUpdate.push('expired_at = ?');
        valueToUpdate.push(data.expired_at);
      }

      const query = `UPDATE orders SET ${columnToUpdate.join(
        ','
      )} WHERE id = ?`;
      const [results]: [any[], any[]] = await this.dbConnection.query(query, [
        ...valueToUpdate,
        orderId.toString(),
      ]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
