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

const userController = new UserController(registerUsecase, verifyUsecase);

const userRouter = express.Router();
userRouter.get('/', (req, res) => res.send('ok'));
userRouter.post('/register', (req, res) => userController.register(req, res));
userRouter.get('/verify', (req, res) => userController.verify(req, res));
export default userRouter;
