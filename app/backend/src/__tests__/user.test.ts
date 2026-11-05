import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('Should return 200 OK for get /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('ok2');
  });

  it('Should return 200 OK when resend verification email is success', async () => {
    const response = await request(app)
      .post('/users/resend-verification')
      .send({
        email: 'test@example.com',
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      message: 'Email verification sent successfully',
    });
  });
});
