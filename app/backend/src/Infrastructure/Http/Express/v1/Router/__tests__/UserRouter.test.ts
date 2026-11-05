/**
 * ForgotPassword
 *  Should return 404 if user not found
 *  Should return 200 if user found and email sent
 *  Should return 500 if error occurs
 */

import request from 'supertest';
import app from '../../../../../../app';
import { MysqlConnection } from '../../../../../DB/MysqlConnection';
import { ConfigService } from '../../../../../Service/ConfigService';

describe('User Router', () => {
  describe('POST /forgot-password', () => {
    afterAll(async () => {
      await MysqlConnection.getInstance(ConfigService.getInstance())
        .getPool()
        .end();
    });

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('Should return 404 if user not found', async () => {
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
  });
});
