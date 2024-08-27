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
import { GetOrdersUsecase } from '../../../../../Application/Usecase/Order/GetOrdersUsecase';
import { GetOrderOwnedByUserUsecase } from '../../../../../Application/Usecase/Order/GetOrderOwnedByUserUsecase';
import { GetOrderItemUsecase } from '../../../../../Application/Usecase/Order/GetOrderItemUsecase';

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

const getOrderUsecase = new GetOrdersUsecase(orderRepository);

const getOrderOwnedByUserUsecase = new GetOrderOwnedByUserUsecase(
  orderRepository
);

const getOrderItemUsecase = new GetOrderItemUsecase(orderRepository);

const updateOrderStatusUsecase = new UpdateOrderStatusUsecase(orderService);
const orderController = new OrderController(
  createOrderUsecase,
  updateOrderStatusUsecase,
  getOrderUsecase,
  getOrderOwnedByUserUsecase,
  getOrderItemUsecase
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
orderRouter.get('/', authMiddleware.applyWithRole(['admin']), (req, res) =>
  orderController.getOrders(req, res)
);
orderRouter.get(
  '/users/:userId',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => orderController.getOrderOwnedByUser(req, res)
);
orderRouter.get(
  '/:orderId/items',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => orderController.getOrderItems(req, res)
);

export default orderRouter;
