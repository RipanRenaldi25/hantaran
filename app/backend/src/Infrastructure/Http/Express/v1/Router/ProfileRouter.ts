import express from 'express';
import { ProfileRepository } from '../../../../Repository/ProfileRepository';
import { AddressRepository } from '../../../../Repository/AddressRepository';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { ConfigService } from '../../../../Service/ConfigService';
import { CreateProfileUsecase } from '../../../../../Application/Usecase/Profile/CrateProfileUsecase';
import { v4 } from 'uuid';
import { AuthMiddleware } from '../Middleware/Auth';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';
import { ProfileController } from '../Controller/ProfileController';
import { multerMiddleware } from '../Middleware/Multer';

const mysqlInstance = MysqlConnection.getInstance(ConfigService.getInstance());
const profileRepository = new ProfileRepository(mysqlInstance.getPool());
const addressRepository = new AddressRepository(mysqlInstance.getPool());
const jwtService = new JwtService(jwt, ConfigService.getInstance());

const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const createProfileUsecase = new CreateProfileUsecase(
  profileRepository,
  v4,
  addressRepository
);

const profileController = new ProfileController(createProfileUsecase);

const profileRouter = express.Router();
profileRouter.post(
  '/',
  authMiddleware.applyWithRole(['user']),
  multerMiddleware.single('image'),
  (req, res) => profileController.createProfile(req, res)
);

export default profileRouter;
