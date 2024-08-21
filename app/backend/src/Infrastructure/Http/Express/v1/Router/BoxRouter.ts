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
import { UpdateBoxUsecase } from '../../../../../Application/Usecase/Box/UpdateBoxUsecase';
import { GetBoxesUsecase } from '../../../../../Application/Usecase/Box/GetBoxesUsecase';
import { ColorRepository } from '../../../../Repository/ColorRepository';
import { DecorationRepository } from '../../../../Repository/DecorationRepository';
import { GetBoxByIdUsecase } from '../../../../../Application/Usecase/Box/GetBoxByIdUsecase';

// MIDDLEWARE
const jwtService = new JwtService(jwt, ConfigService.getInstance());

// CONNECTION
const mysqlConnectionInstance = MysqlConnection.getInstance(
  ConfigService.getInstance()
);

// REPOSITORIES
const colorRepository = new ColorRepository(mysqlConnectionInstance.getPool());
const decorationRepository = new DecorationRepository(
  mysqlConnectionInstance.getPool()
);
const boxRepository = new BoxRepository(
  mysqlConnectionInstance.getPool(),
  colorRepository,
  decorationRepository
);

// USECASES
const createBoxUsecase = new CreateBoxUsecase(boxRepository, v4);
const deleteBoxUsecase = new DeleteBoxUsecase(boxRepository);
const updateBoxUsecase = new UpdateBoxUsecase(boxRepository);
const getBoxesUsecase = new GetBoxesUsecase(boxRepository);
const getBoxByIdUsecase = new GetBoxByIdUsecase(boxRepository);
// CONTROLLER
const boxController = new BoxController(
  createBoxUsecase,
  deleteBoxUsecase,
  updateBoxUsecase,
  getBoxesUsecase,
  getBoxByIdUsecase
);

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
boxRouter.put('/:boxId', authMiddleware.applyWithRole(['admin']), (req, res) =>
  boxController.updateBox(req, res)
);

boxRouter.get(
  '/',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => boxController.getBoxesWithTotal(req, res)
);

boxRouter.get(
  '/:boxId',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => boxController.getBoxById(req, res)
);

export default boxRouter;
