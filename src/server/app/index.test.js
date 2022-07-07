import request from 'supertest';
import db from '@server/db';
import app from './index';

describe('App', () => {
  afterAll(async () => {
    await db.close();
  });

  it('should response with status code 200', async () => {
    const response = await request(app).get('/api/v1/about');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({
      contents: '',
      html_contents: '',
      created_at: expect.any(String),
      updated_at: expect.any(String),
      deleted_at: null,
      id: expect.any(String),
    }));
  });
});
