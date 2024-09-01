import { Request, Response } from 'express';
import { CreateOrderUsecase } from '../../../../../Application/Usecase/Order/CreateOrderUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { validateCreateOrderPayload } from '../../../../Helper/Validator/Order/OrderValidator';
import { UpdateOrderStatusUsecase } from '../../../../../Application/Usecase/Order/UpdateOrderStatus';
import { GetOrdersUsecase } from '../../../../../Application/Usecase/Order/GetOrdersUsecase';
import { GetOrderOwnedByUserUsecase } from '../../../../../Application/Usecase/Order/GetOrderOwnedByUserUsecase';
import { InvariantError } from '../../../../../Domain/Exception/InvariantError';
import { GetOrderItemUsecase } from '../../../../../Application/Usecase/Order/GetOrderItemUsecase';
import { GetOrderByIdUsecase } from '../../../../../Application/Usecase/Order/GetOrderByIdUsecase';

export class OrderController {
  constructor(
    private readonly createOrderUsecase: CreateOrderUsecase,
    private readonly updateOrderStatusUsecase: UpdateOrderStatusUsecase,
    private readonly getOrderUsecase: GetOrdersUsecase,
    private readonly getOrderOwnedByUserUsecase: GetOrderOwnedByUserUsecase,
    private readonly getOrderItemUsecase: GetOrderItemUsecase,
    private readonly getOrderByIdUsecase: GetOrderByIdUsecase
  ) {}

  async createOrder(req: Request, res: Response) {
    try {
      validateCreateOrderPayload(req.body);
      const {
        orderItems,
        price,
        paymentMethod,
        acquirer,
        billInfo1,
        billInfo2,
        bankName,
        vaNumber,
        weddingDate,
        address,
      } = req.body;
      const { id: userId } = (req as any)['user'];
      const order = await this.createOrderUsecase.execute({
        userId,
        orderItems,
        price,
        paymentMethod,
        acquirer,
        bankName,
        billInfo1,
        billInfo2,
        vaNumber,
        weddingDate,
        address,
      });
      res.status(201).json({
        status: 'Success',
        message: `Order created`,
        data: order,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: 'Client Error: ' + err.message,
        });
      } else {
        res.status(500).json({
          status: 'Error',
          message: err.message,
        });
      }
    }
  }

  async handleChangeTransactionStatus(req: Request, res: Response) {
    try {
      console.log({ body: req.body });
      let updatedOrder = {};
      const { transaction_status: status, order_id: orderId } = req.body;
      if (status === 'settlement') {
        updatedOrder = await this.updateOrderStatusUsecase.execute({
          orderId,
          status,
        });
        console.log({ updatedOrder });
        console.log('settlement');
      } else if (status === 'expired') {
        updatedOrder = await this.updateOrderStatusUsecase.execute({
          orderId,
          status,
        });
      } else if (status === 'failed') {
        updatedOrder = await this.updateOrderStatusUsecase.execute({
          orderId,
          status,
        });
      }
      res.status(200).send('ok');
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const orders = await this.getOrderUsecase.execute();
      res.status(200).json({
        status: 'Success',
        message: `Orders fetched`,
        data: orders,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: 'Client Error: ' + err.message,
        });
      } else {
        res.status(500).json({
          status: 'Error',
          message: err.message,
        });
      }
    }
  }

  async getOrderOwnedByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new InvariantError('User Id cannot be empty');
      }
      const orders = await this.getOrderOwnedByUserUsecase.execute(userId);
      res.status(200).json({
        status: 'Success',
        message: `Orders fetched`,
        data: orders,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: 'Client Error: ' + err.message,
        });
      } else {
        res.status(500).json({
          status: 'Error',
          message: err.message,
        });
      }
    }
  }

  async getOrderItems(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { id: userId } = (req as any)['user'];
      if (!orderId) {
        throw new InvariantError('Order Id cannot be empty');
      }
      const orderItems = await this.getOrderItemUsecase.execute({
        orderId,
        userId,
      });
      res.status(200).json({
        status: 'Success',
        message: `Order Items fetched`,
        data: orderItems,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: 'Client Error: ' + err.message,
        });
      } else {
        res.status(500).json({
          status: 'Error',
          message: err.message,
        });
      }
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const order = await this.getOrderByIdUsecase.execute(orderId);
      res.status(200).json({
        status: 'Success',
        message: `Order fetched`,
        data: order,
      });
    } catch (err: any) {
      if (err instanceof ClientError) {
        res.status(err.statusCode).json({
          status: 'Fail',
          message: 'Client Error: ' + err.message,
        });
      } else {
        res.status(500).json({
          status: 'Error',
          message: err.message,
        });
      }
    }
  }
}
