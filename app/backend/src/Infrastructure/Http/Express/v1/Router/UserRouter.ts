import express from 'express';
import { UserController } from '../Controller/UserController';
import { MysqlConnection } from '../../../../DB/MysqlConnection';
import { CreateUserUsecase } from '../../../../../Application/Usecase/User/CreateUserUsecase';
import { EmailService } from '../../../../Service/EmailService';
import nodemailer from 'nodemailer';
import { ConfigService } from '../../../../Service/ConfigService';
import { PasswordHashService } from '../../../../Service/PasswordHashService';
import { JwtService } from '../../../../Service/JwtService';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { UserService } from '../../../../Service/UserService';
import { UserRepository } from '../../../../Repository/UserRepository';
import bcrypt from 'bcryptjs';
import { VerifyUsecase } from '../../../../../Application/Usecase/User/VerifyUsecase';
import { LoginUsecase } from '../../../../../Application/Usecase/User/LoginUsecase';
import { UpdatePasswordUsecase } from '../../../../../Application/Usecase/User/UpdatePasswordUsecase';
import { AuthMiddleware } from '../Middleware/Auth';

// REPOSITORY
const userRepository = new UserRepository(
  MysqlConnection.getInstance(ConfigService.getInstance()).getPool()
);

// SERVICES
const emailService = new EmailService(nodemailer, ConfigService.getInstance());
const passwordHashService = new PasswordHashService(bcrypt);
const jwtService = new JwtService(jwt, ConfigService.getInstance());
const userService = new UserService(userRepository);

// USECASE
const registerUsecase = new CreateUserUsecase(
  emailService,
  userRepository,
  ConfigService.getInstance(),
  passwordHashService,
  jwtService,
  v4
);

const verifyUsecase = new VerifyUsecase(
  userRepository,
  jwtService,
  ConfigService.getInstance()
);

const loginUsecase = new LoginUsecase(
  userRepository,
  passwordHashService,
  jwtService,
  ConfigService.getInstance()
);

const updatePasswordUsecase = new UpdatePasswordUsecase(
  userRepository,
  passwordHashService
);

// CONTROLLER
const userController = new UserController(
  registerUsecase,
  verifyUsecase,
  loginUsecase,
  updatePasswordUsecase
);

// MIDLEWARE
const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance()
);

const userRouter = express.Router();
userRouter.get('/', (req, res) => res.send('ok'));
userRouter.post('/register', (req, res) => userController.register(req, res));
userRouter.get('/verify', (req, res) => userController.verify(req, res));
userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post(
  '/password/',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => userController.changeUserPassword(req, res)
);
export default userRouter;
