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
import { DeleteItemFromCartUsecase } from '../../../../../Application/Usecase/Cart/DeleteItemFromCartUsecase';
import { UpdateCartItemUsecase } from '../../../../../Application/Usecase/Cart/UpdateCartItemUsecase';
import { GetUserCartUsecase } from '../../../../../Application/Usecase/Cart/GetUserCartUsecase';

const jwtService = new JwtService(jwt, ConfigService.getInstance());
const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const cartRepository = new CartRepository(
  MysqlConnection.getInstance(ConfigService.getInstance()).getPool()
);

const createCartUsecase = new CreateCartUsecase(cartRepository, v4);
const deleteItemFromCartUsecase = new DeleteItemFromCartUsecase(cartRepository);
const updateItemUsecase = new UpdateCartItemUsecase(cartRepository);
const getUserCartUsecase = new GetUserCartUsecase(cartRepository);

const cartController = new CartController(
  createCartUsecase,
  deleteItemFromCartUsecase,
  updateItemUsecase,
  getUserCartUsecase
);

const cartRouter = express.Router();
cartRouter.post('/', authMiddleware.applyWithRole(['user']), (req, res) =>
  cartController.createCart(req, res)
);
cartRouter.delete(
  '/items/:cartId/:boxId',
  authMiddleware.applyWithRole(['user']),
  (req, res) => cartController.deleteItemFromCart(req, res)
);
cartRouter.put(
  '/items/:cartId/:boxId',
  authMiddleware.applyWithRole(['user']),
  (req, res) => cartController.updateCart(req, res)
);
cartRouter.get('/self/', authMiddleware.applyWithRole(['user']), (req, res) =>
  cartController.getCartOwnedByUser(req, res)
);
export default cartRouter;
