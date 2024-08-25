import express from 'express';
import { AuthMiddleware } from '../Middleware/Auth';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';
import { ConfigService } from '../../../../Service/ConfigService';
import { CartController } from '../Controller/CartController';
import { CreateCartUsecase } from '../../../../../Application/Usecase/Cart/CreateCartUsecase';
import { CartRepository } from '../../../../Repository/CartRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { v4 } from 'uuid';

const jwtService = new JwtService(jwt, ConfigService.getInstance());
const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const cartRepository = new CartRepository(
  MysqlConnection.getInstance(ConfigService.getInstance()).getPool()
);

const createCartUsecase = new CreateCartUsecase(cartRepository, v4);

const cartController = new CartController(createCartUsecase);

const cartRouter = express.Router();
cartRouter.post('/', authMiddleware.applyWithRole(['user']), (req, res) =>
  cartController.createCart(req, res)
);

export default cartRouter;
