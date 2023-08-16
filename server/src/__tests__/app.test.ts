import request from 'supertest';
import app from '../app';

describe('App', () => {
  it('should respond with healthcheck status', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'operating' });
  });
});
