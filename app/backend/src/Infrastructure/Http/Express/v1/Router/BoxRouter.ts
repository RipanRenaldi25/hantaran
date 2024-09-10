import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { ConnectBoxWithDecorationAndColorUsecase } from '../../../../../Application/Usecase/Box/ConnectBoxWithColorAndDecorationUsecase';
import { ConnectBoxWithColorUsecase } from '../../../../../Application/Usecase/Box/ConnectBoxWithColorUsecase';
import { ConnectBoxWithDecorationUsecase } from '../../../../../Application/Usecase/Box/ConnectBoxWithDecorationUsecase';
import { CreateBoxUsecase } from '../../../../../Application/Usecase/Box/CreateBoxUsecase';
import { DeleteBoxUsecase } from '../../../../../Application/Usecase/Box/DeleteBoxUsecase';
import { GetBoxByIdUsecase } from '../../../../../Application/Usecase/Box/GetBoxByIdUsecase';
import { GetBoxesUsecase } from '../../../../../Application/Usecase/Box/GetBoxesUsecase';
import { getBoxesWithColorAndDecorationUsecase } from '../../../../../Application/Usecase/Box/GetBoxWithColorAndDecorationUsecase';
import { GetBoxWithColorAndDecorationByBoxIdUsecase } from '../../../../../Application/Usecase/Box/GetBoxWithColorsAndDecorationByBoxId';
import { UnconnectBoxDecorationUsecase } from '../../../../../Application/Usecase/Box/UnconnectBoxDecoration';
import { UnconnectBoxWithColorUsecase } from '../../../../../Application/Usecase/Box/UnconnectBoxWithColor';
import { UpdateBoxUsecase } from '../../../../../Application/Usecase/Box/UpdateBoxUsecase';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { BoxRepository } from '../../../../Repository/BoxRepository';
import { ColorRepository } from '../../../../Repository/ColorRepository';
import { DecorationRepository } from '../../../../Repository/DecorationRepository';
import { ConfigService } from '../../../../Service/ConfigService';
import { JwtService } from '../../../../Service/JwtService';
import { BoxController } from '../Controller/BoxController';
import { AuthMiddleware } from '../Middleware/Auth';
import { multerMiddleware } from '../Middleware/Multer';
import { Request, Response } from 'express';

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
const connectBoxUsecase = new ConnectBoxWithDecorationAndColorUsecase(
  boxRepository,
  v4,
  colorRepository,
  decorationRepository
);
const connectBoxWithColorUsecase = new ConnectBoxWithColorUsecase(
  boxRepository,
  colorRepository
);
const connectBoxWithDecorationUsecase = new ConnectBoxWithDecorationUsecase(
  boxRepository,
  decorationRepository
);

const getBoxesWithColorAndDecoration =
  new getBoxesWithColorAndDecorationUsecase(boxRepository);

const unconnectBoxWithColorUsecase = new UnconnectBoxWithColorUsecase(
  boxRepository
);
const unconnectBoxWithDecorationUsecase = new UnconnectBoxDecorationUsecase(
  boxRepository
);
const getBoxWithColorAndDecorationByBoxIdUsecase =
  new GetBoxWithColorAndDecorationByBoxIdUsecase(
    boxRepository,
    colorRepository,
    decorationRepository
  );

// CONTROLLER
const boxController = new BoxController(
  createBoxUsecase,
  deleteBoxUsecase,
  updateBoxUsecase,
  getBoxesUsecase,
  getBoxByIdUsecase,
  connectBoxUsecase,
  connectBoxWithColorUsecase,
  connectBoxWithDecorationUsecase,
  getBoxesWithColorAndDecoration,
  unconnectBoxWithColorUsecase,
  unconnectBoxWithDecorationUsecase,
  getBoxWithColorAndDecorationByBoxIdUsecase
);

const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const boxRouter = express.Router();

boxRouter.get(
  '/:boxId/colors/decorations',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req: Request, res: Response) => boxController.getBoxWithColor(req, res)
);
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
boxRouter.put(
  '/:boxId',
  multerMiddleware.single('image'),
  authMiddleware.applyWithRole(['admin']),
  (req, res) => boxController.updateBox(req, res)
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

boxRouter.post(
  '/connect/',
  authMiddleware.applyWithRole(['admin']),
  (req, res) => boxController.connectBox(req, res)
);

boxRouter.post(
  '/connect/colors/',
  authMiddleware.applyWithRole(['admin']),
  (req, res) => boxController.connectBoxWithColor(req, res)
);
boxRouter.post(
  '/connect/decorations/',
  authMiddleware.applyWithRole(['admin']),
  (req, res) => boxController.connectBoxWithDecoration(req, res)
);

boxRouter.get(
  '/colors/decorations/',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => boxController.getBoxesWithColorAndDecoration(req, res)
);

boxRouter.delete(
  '/:boxId/colors/:colorId',
  authMiddleware.applyWithRole(['admin']),
  (req, res) => boxController.unconnectBoxWithColor(req, res)
);

export default boxRouter;
