import express from 'express';
import { AuthMiddleware } from '../Middleware/Auth';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';
import { ConfigService } from '../../../../Service/ConfigService';
import { DecorationRepository } from '../../../../Repository/DecorationRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { CreateDecorationUsecase } from '../../../../../Application/Usecase/Decoration/CreateDecorationUsecase';
import { v4 } from 'uuid';
import { DecorationController } from '../Controller/DecorationController';
import { GetDecorationUsecase } from '../../../../../Application/Usecase/Decoration/GetDecorationUsecase';

const jwtService = new JwtService(jwt, ConfigService.getInstance());
const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const mysqlInstance = MysqlConnection.getInstance(ConfigService.getInstance());

const decorationRepository = new DecorationRepository(mysqlInstance.getPool());

const createDecorationUsecase = new CreateDecorationUsecase(
  decorationRepository,
  v4
);

const getDecorationUsecase = new GetDecorationUsecase(decorationRepository);

const decorationController = new DecorationController(
  createDecorationUsecase,
  getDecorationUsecase
);

const decorationRouter = express.Router();

decorationRouter.get(
  '/',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => decorationController.getDecorations(req, res)
);

decorationRouter.post(
  '/',
  authMiddleware.applyWithRole(['admin']),
  (req, res) => decorationController.createDecoration(req, res)
);

export default decorationRouter;
