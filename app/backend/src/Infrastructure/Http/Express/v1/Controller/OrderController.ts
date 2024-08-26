import { Request, Response } from 'express';
import { CreateOrderUsecase } from '../../../../../Application/Usecase/Order/CreateOrderUsecase';
import { ClientError } from '../../../../../Domain/Exception/ClientError';
import { validateCreateOrderPayload } from '../../../../Helper/Validator/Order/OrderValidator';

export class OrderController {
  constructor(private readonly createOrderUsecase: CreateOrderUsecase) {}

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
      console.log(req.body);

      res.status(200).json({
        status: 'Success',
        message: 'Transaction status changed',
        data: req.body,
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
