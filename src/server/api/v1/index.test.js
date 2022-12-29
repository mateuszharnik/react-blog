import request from 'supertest';
import db from '@server/db';
import app from '@server/app';

describe('API version 1', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.close();
  });

  /* =============== GET test data =============== */
  describe('GET /', () => {
    it('should response with status 200', async () => {
      const response = await request(app).get('/api/v1');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toStrictEqual({ message: '🖤' });
    });
  });

  /* =============== GET CSRF Token =============== */
  describe('GET /csrf-token', () => {
    it('should response with status 200 and csrf tokens', async () => {
      const response = await request(app).get('/api/v1/csrf-token');

      expect(response.statusCode).toEqual(200);

      expect(Array.isArray(response.headers['set-cookie'])).toEqual(true);
      expect(typeof response.headers['set-cookie'][0]).toBe('string');
      expect(response.headers['set-cookie'][0].split(';')[0]).toContain('_csrf=');
      expect(response.headers['set-cookie'][0].split(';')).toStrictEqual([
        expect.any(String),
        ' Path=/',
        ' HttpOnly',
        ' SameSite=Strict',
      ]);

      expect(response.body).toStrictEqual({
        CSRFToken: expect.any(String),
      });
    });
  });
});
