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
import { UpdateProfileUsecase } from '../../../../../Application/Usecase/Profile/UpdateProfileUsecase';
import { EditProfileUsecase } from '../../../../../Application/Usecase/Profile/EditProfileUsecase';

const mysqlInstance = MysqlConnection.getInstance(ConfigService.getInstance());
const addressRepository = new AddressRepository(mysqlInstance.getPool());
const profileRepository = new ProfileRepository(
  mysqlInstance.getPool(),
  addressRepository
);
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

const updateProfileUsecase = new UpdateProfileUsecase(profileRepository);

const editProfileUsecase = new EditProfileUsecase(profileRepository);

const profileController = new ProfileController(
  createProfileUsecase,
  updateProfileUsecase,
  editProfileUsecase
);

const profileRouter = express.Router();
profileRouter.post(
  '/',
  authMiddleware.applyWithRole(['user']),
  multerMiddleware.single('image'),
  (req, res) => profileController.createProfile(req, res)
);
profileRouter.put(
  '/user/',
  authMiddleware.applyWithRole(['user']),
  multerMiddleware.single('image'),
  (req, res) => profileController.updateProfile(req, res)
);
profileRouter.patch(
  '/user/:userId',
  authMiddleware.applyWithRole(['admin', 'user']),
  multerMiddleware.single('image'),
  (req, res) => profileController.editProfile(req, res)
);
export default profileRouter;
