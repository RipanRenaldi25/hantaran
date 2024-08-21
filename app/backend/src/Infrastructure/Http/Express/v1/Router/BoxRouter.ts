import express from 'express';
import { BoxController } from '../Controller/BoxController';
import { CreateBoxUsecase } from '../../../../../Application/Usecase/Box/CreateBoxUsecase';
import { BoxRepository } from '../../../../Repository/BoxRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { ConfigService } from '../../../../Service/ConfigService';
import { v4 } from 'uuid';
import { multerMiddleware } from '../Middleware/Multer';
import { AuthMiddleware } from '../Middleware/Auth';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';
import { DeleteBoxUsecase } from '../../../../../Application/Usecase/Box/DeleteBoxUsecase';

// MIDDLEWARE
const jwtService = new JwtService(jwt, ConfigService.getInstance());

// CONNECTION
const mysqlConnectionInstance = MysqlConnection.getInstance(
  ConfigService.getInstance()
);

// REPOSITORIES
const boxRepository = new BoxRepository(mysqlConnectionInstance.getPool());

// USECASES
const createBoxUsecase = new CreateBoxUsecase(boxRepository, v4);
const deleteBoxUsecase = new DeleteBoxUsecase(boxRepository);

// CONTROLLER
const boxController = new BoxController(createBoxUsecase, deleteBoxUsecase);

const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const boxRouter = express.Router();

// boxRouter.post('/', multerMiddleware.single('image'), (req, res) =>
//   boxController.createBox(req, res)
// );
boxRouter.post(
  '/',
  authMiddleware.applyWithRole(['admin']),
  multerMiddleware.single('image'),
  (req, res) => boxController.createBox(req, res)
);
boxRouter.delete(
  '/:boxId',
  authMiddleware.applyWithRole(['admin']),
  (req, res) => boxController.deleteBox(req, res)
);

export default boxRouter;
