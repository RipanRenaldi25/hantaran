import express from 'express';
import { ColorController } from '../Controller/ColorController';
import { CreateColorUsecase } from '../../../../../Application/Usecase/Color/CreateColorUsecase';
import { v4 } from 'uuid';
import { ColorRepository } from '../../../../Repository/ColorRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { ConfigService } from '../../../../Service/ConfigService';
import { AuthMiddleware } from '../Middleware/Auth';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';

const mysqlConnectionInstance = MysqlConnection.getInstance(
  ConfigService.getInstance()
);
const jwtService = new JwtService(jwt, ConfigService.getInstance());

const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);
const colorRepository = new ColorRepository(mysqlConnectionInstance.getPool());
const createColorUsecase = new CreateColorUsecase(colorRepository, v4);

const colorController = new ColorController(createColorUsecase);

const colorRouter = express.Router();

colorRouter.post('/', authMiddleware.applyWithRole(['admin']), (req, res) =>
  colorController.createColor(req, res)
);

export default colorRouter;
