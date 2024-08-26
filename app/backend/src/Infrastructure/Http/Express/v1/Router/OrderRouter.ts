import express, { Request, Response } from 'express';
import { AuthMiddleware } from '../Middleware/Auth';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';
import { ConfigService } from '../../../../Service/ConfigService';
import { OrderController } from '../Controller/OrderController';
import { CreateOrderUsecase } from '../../../../../Application/Usecase/Order/CreateOrderUsecase';
import { OrderService } from '../../../../Service/OrderService';
import { OrderRepository } from '../../../../Repository/OrderRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { v4 } from 'uuid';
import axios from 'axios';
import { UserRepository } from '../../../../Repository/UserRepository';
import { UpdateOrderStatusUsecase } from '../../../../../Application/Usecase/Order/UpdateOrderStatus';

const mysqlConnection = MysqlConnection.getInstance(
  ConfigService.getInstance()
);

const orderRepository = new OrderRepository(mysqlConnection.getPool());
const userRepository = new UserRepository(mysqlConnection.getPool());

const jwtService = new JwtService(jwt, ConfigService.getInstance());
const orderService = new OrderService(
  orderRepository,
  axios,
  ConfigService.getInstance()
);

const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const createOrderUsecase = new CreateOrderUsecase(
  orderService,
  v4,
  userRepository
);
const updateOrderStatusUsecase = new UpdateOrderStatusUsecase(orderService);
const orderController = new OrderController(
  createOrderUsecase,
  updateOrderStatusUsecase
);

const orderRouter = express.Router();

orderRouter.post(
  '/',
  authMiddleware.applyWithRole(['user']),
  (req: Request, res: Response) => orderController.createOrder(req, res)
);
orderRouter.post('/notifications/', (req, res) =>
  orderController.handleChangeTransactionStatus(req, res)
);

export default orderRouter;
