import express, { Request, Response } from 'express';
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
import { GetUserByIdUsecase } from '../../../../../Application/Usecase/User/GetUserUsecase';
import { GetUserLoginUsecase } from '../../../../../Application/Usecase/User/GetUserLoginUsecase';
import { getUserWithProfile } from '../../../../../Application/Usecase/User/GetUserWithProfileUsecase';
import { GetUserWithProfileAndAddressUsecase } from '../../../../../Application/Usecase/User/GetUserWithProfileAndAddressUsecase';
import { ResendEmailVerificationUsecase } from '../../../../../Application/Usecase/User/ResendEmailVerificationUsecase';
import { ForgotPasswordUsecase } from '../../../../../Application/Usecase/User/ForgotPasswordUsecase';
import { tokenMiddleware } from '../Middleware/Token';

// REPOSITORY
const userRepository = new UserRepository(
  MysqlConnection.getInstance(ConfigService.getInstance()).getPool(),
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
  v4,
);

const verifyUsecase = new VerifyUsecase(
  userRepository,
  jwtService,
  ConfigService.getInstance(),
);

const loginUsecase = new LoginUsecase(
  userRepository,
  passwordHashService,
  jwtService,
  ConfigService.getInstance(),
);

const updatePasswordUsecase = new UpdatePasswordUsecase(
  userRepository,
  passwordHashService,
);

const getUserByIdUsecase = new GetUserByIdUsecase(userRepository);
const getUserLoginUsecase = new GetUserLoginUsecase(userRepository);
const getUserWithProfileUsecase = new getUserWithProfile(userRepository);
const getUserWithProfileAndAddressUsecase =
  new GetUserWithProfileAndAddressUsecase(userRepository);

const resendEmailVerificationUsecase = new ResendEmailVerificationUsecase(
  emailService,
  ConfigService.getInstance(),
  jwtService,
);

const forgotPasswordUsecase = new ForgotPasswordUsecase(
  userService,
  jwtService,
  ConfigService.getInstance(),
  emailService,
);

// CONTROLLER
const userController = new UserController(
  registerUsecase,
  verifyUsecase,
  loginUsecase,
  updatePasswordUsecase,
  getUserByIdUsecase,
  getUserLoginUsecase,
  ConfigService.getInstance(),
  getUserWithProfileUsecase,
  getUserWithProfileAndAddressUsecase,
  resendEmailVerificationUsecase,
  forgotPasswordUsecase,
);

// MIDLEWARE
const authMiddleware = AuthMiddleware.getInstance(
  jwtService,
  ConfigService.getInstance(),
);

const userRouter = express.Router();
userRouter.get('/', (req, res) => res.send('ok'));
userRouter.post('/register', (req, res) => userController.register(req, res));
userRouter.get('/verify', (req, res) => userController.verify(req, res));
userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post('/forgot-password', (req, res) =>
  userController.sendLinkForgotPassword(req, res),
);
userRouter.post('/resend-verification', (req, res) =>
  userController.resendEmailVerification(req, res),
);
userRouter.post(
  '/password/',
  authMiddleware.applyWithRole(['admin', 'user']),
  (req, res) => userController.changeUserPassword(req, res),
);
userRouter.get(
  '/self/profile',
  authMiddleware.applyWithRole(['user', 'admin']),
  (req, res) => userController.getUserLogin(req, res),
);
userRouter.get(
  '/self/profiles/',
  authMiddleware.applyWithRole(['user', 'admin']),
  (req, res) => userController.getUserWithProfile(req, res),
);
userRouter.get('/:userId', (req, res) => userController.getUserById(req, res));
userRouter.get('/:userId/profiles/addresses/', (req, res) =>
  userController.getUserWithProfileAndAddresses(req, res),
);

userRouter.patch(
  '/reset-password',
  tokenMiddleware(jwtService, ConfigService.getInstance()),
  (req: Request, res: Response) => userController.resetPassword(req, res),
);

export default userRouter;
