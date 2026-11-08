/**
 * ForgotPassword
 *  Should return 404 if user not found
 *  Should return 200 if user found and email sent
 */

import request from 'supertest';
import app from '../../../../../../app';
import { UpdatePasswordUsecase } from '../../../../../../Application/Usecase/User/UpdatePasswordUsecase';
import { NotFoundError } from '../../../../../../Domain/Exception/NotFoundError';
import { MysqlConnection } from '../../../../../DB/MysqlConnection';
import { ConfigService } from '../../../../../Service/ConfigService';
import { EmailService } from '../../../../../Service/EmailService';
import { JwtService } from '../../../../../Service/JwtService';
import { UserService } from '../../../../../Service/UserService';

describe('User Router', () => {
  afterAll(async () => {
    await MysqlConnection.getInstance(ConfigService.getInstance())
      .getPool()
      .end();
  });
  describe('GET /users', () => {
    it('Should return 200 with text ok', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.text).toBe('ok');
    });
  });

  describe('POST /forgot-password', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('Should return 404 if user not found', async () => {
      jest
        .spyOn(UserService.prototype, 'getUserByEmail')
        .mockRejectedValue(new NotFoundError('User not found'));
      const response = await request(app).post('/users/forgot-password').send({
        email: 'nonexistemail@example.com',
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'Fail',
        message: 'Client Error: User not found',
      });
    });

    it('Should return 200 if user found and email sent', async () => {
      jest.spyOn(UserService.prototype, 'getUserByEmail').mockResolvedValue({
        getId: () => ({ toString: () => '1' }),
        getEmail: () => 'test',
      } as any);
      jest
        .spyOn(EmailService.prototype, 'sendEmail')
        .mockResolvedValue(undefined);
      const response = await request(app)
        .post('/users/forgot-password')
        .send({
          email: ConfigService.getInstance().get('SMTP_USER'),
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'success',
        message: 'Email verification sent successfully',
      });
    });

    it('Should return 500 if email service fails', async () => {
      jest.spyOn(UserService.prototype, 'getUserByEmail').mockResolvedValue({
        getId: () => ({ toString: () => '1' }),
        getEmail: () => 'test',
      } as any);
      jest
        .spyOn(EmailService.prototype, 'sendEmail')
        .mockRejectedValue(new Error('Email service failed'));

      const response = await request(app).post('/users/forgot-password').send({
        email: 'nouserExists@gmail.com',
      });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: 'Fail',
        message: 'Server error: Email service failed',
      });
    });
  });

  describe('PATCH /reset-password', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('Should return 401 if token is invalid', async () => {
      const response = await request(app)
        .patch('/users/reset-password')
        .set('Authorization', 'Bearer invalidtoken')
        .send({
          password: 'newpassword',
        });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
    });

    it('Should return 200 if token is valid and password reset', async () => {
      const executeSpy = jest
        .spyOn(UpdatePasswordUsecase.prototype, 'execute')
        .mockResolvedValue(undefined);

      jest
        .spyOn(JwtService.prototype, 'verifyToken')
        .mockReturnValue({ userId: '1', email: 'mockEmail' });

      const response = await request(app)
        .patch('/users/reset-password')
        .query({
          token: `Bearer validToken`,
        })
        .send({
          password: 'newpassword',
        });

      console.log(response.status, response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
      expect(executeSpy).toHaveBeenCalledWith({
        userId: '1',
        password: 'newpassword',
      });
    });

    it('Should return 500 if UpdatePasswordUsecase fails', async () => {
      jest
        .spyOn(JwtService.prototype, 'verifyToken')
        .mockReturnValue({ userId: '1', email: 'mockEmail' });

      jest
        .spyOn(UpdatePasswordUsecase.prototype, 'execute')
        .mockRejectedValue(new Error('UpdatePasswordUsecase failed'));

      const response = await request(app)
        .patch('/users/reset-password')
        .query({
          token: `Bearer validToken`,
        })
        .send({
          password: 'newpassword',
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
    });
  });
});
