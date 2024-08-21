import express from 'express';
import { BoxController } from '../Controller/BoxController';
import { CreateBoxUsecase } from '../../../../../Application/Usecase/Box/CreateBoxUsecase';
import { BoxRepository } from '../../../../Repository/BoxRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { ConfigService } from '../../../../Service/ConfigService';
import { v4 } from 'uuid';
import { multerMiddleware } from '../Middleware/Multer';

// MIDDLEWARE

// CONNECTION
const mysqlConnectionInstance = MysqlConnection.getInstance(
  ConfigService.getInstance()
);

// REPOSITORIES
const boxRepository = new BoxRepository(mysqlConnectionInstance.getPool());

// USECASES
const createBoxUsecase = new CreateBoxUsecase(boxRepository, v4);

// CONTROLLER
const boxController = new BoxController(createBoxUsecase);

const boxRouter = express.Router();

// boxRouter.post('/', multerMiddleware.single('image'), (req, res) =>
//   boxController.createBox(req, res)
// );
boxRouter.post('/', multerMiddleware.single('image'), (req, res) =>
  boxController.createBox(req, res)
);

export default boxRouter;
