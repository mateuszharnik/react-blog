import request from 'supertest';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import { seedAbout } from '@server/seeds/about';
import { mockedAbout } from '@server/mocks/about';
import app from './index';

describe('App', () => {
  afterAll(async () => {
    await db.close();
  });

  beforeAll(async () => {
    await cleanDB();

    await seedAbout(mockedAbout);
  });

  it('should response with status code 200', async () => {
    const response = await request(app).get('/api/v1/about');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({
      contents: 'Przykładowa strona o blogu.',
      html_contents: '<p>Przykładowa strona o blogu.</p>\n',
      created_at: expect.any(String),
      updated_at: expect.any(String),
      deleted_at: null,
      id: expect.any(String),
    }));
  });
});
