import request from 'supertest';
import db from '@server/db';
import app from './index';

describe('App', () => {
  afterAll(async () => {
    await db.close();
  });

  it('should response with status code 200', async () => {
    const response = await request(app).get('/api/v1');

    expect(response.statusCode).toEqual(200);
  });
});
