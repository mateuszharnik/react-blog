import colors from 'colors/safe';
import jwt, { sign, JsonWebTokenError } from 'jsonwebtoken';
import db from '@server/db';
import config from '@server/config';
import logger from '@server/logger';
import Config from '@server/api/v1/config/model';
import cleanDB from '@server/seeds/cleanDB';
import { seedConfig } from '@server/seeds/config';
import { mockedConfig } from '@server/mocks/config';
import createResponseWithError from '@server/helpers/createResponseWithError';
import {
  isLoggedIn,
  isNotLoggedIn,
  isNotUseDocsPassword,
} from './index';

jest.mock('../../helpers/createResponseWithError');

describe('Docs middlewares', () => {
  const next = jest.fn();
  const res = {
    redirect: jest.fn(),
    status: jest.fn(function status() {
      return this;
    }),
    json: jest.fn(function json() {
      return this;
    }),
  };

  const responseWithError = jest.fn();
  createResponseWithError.mockImplementation(() => responseWithError);

  const loggerSpy = jest.spyOn(logger, 'error');
  const findOneSpy = jest.spyOn(Config, 'findOne');

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.close();
  });

  /* =============== isLoggedIn middleware =============== */
  describe('isLoggedIn', () => {
    const verifySpy = jest.spyOn(jwt, 'verify');

    beforeAll(async () => {
      await cleanDB();
    });

    it('should return `next` function if config not exist in db', async () => {
      const req = {};

      await isLoggedIn(req, res, next);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });

    it('should return `next` function if `use_docs_password` prop is equal `false`', async () => {
      const req = {};

      await seedConfig({ ...mockedConfig, use_docs_password: false });

      await isLoggedIn(req, res, next);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });

    it('should redirect user to `/dokumentacja` if token not exist in `req.cookies`', async () => {
      const req = {};

      await cleanDB();
      await seedConfig(mockedConfig);

      await isLoggedIn(req, res, next);

      expect(res.redirect).toBeCalledWith('/dokumentacja');
      expect(res.redirect).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });

    it('should redirect user to `/dokumentacja` if token is invalid', async () => {
      const token = sign({}, 'invalid_token', { expiresIn: '5m' });
      const req = { cookies: { _docs: token } };

      await isLoggedIn(req, res, next);

      expect(verifySpy).toBeCalledWith(token, config.DOCS_TOKEN_SECRET);
      expect(verifySpy).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledWith(colors.red(new JsonWebTokenError('invalid signature')));
      expect(loggerSpy).toBeCalledTimes(1);

      expect(res.redirect).toBeCalledWith('/dokumentacja');
      expect(res.redirect).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should redirect user to `/dokumentacja` if decoded token is empty', async () => {
      const token = sign({}, config.DOCS_TOKEN_SECRET, { expiresIn: '5m' });
      const req = { cookies: { _docs: token } };

      await isLoggedIn(req, res, next);

      expect(verifySpy).toBeCalledWith(token, config.DOCS_TOKEN_SECRET);
      expect(verifySpy).toBeCalledTimes(1);

      expect(res.redirect).toBeCalledWith('/dokumentacja');
      expect(res.redirect).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });

    it('should redirect user to `/dokumentacja` if error occurred', async () => {
      const req = {};

      findOneSpy.mockRejectedValueOnce('error');

      await isLoggedIn(req, res, next);

      expect(verifySpy).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledWith(colors.red('error'));
      expect(loggerSpy).toBeCalledTimes(1);

      expect(res.redirect).toBeCalledWith('/dokumentacja');
      expect(res.redirect).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return `next` function if token is valid and has `id` prop', async () => {
      const token = sign({ id: '123' }, config.DOCS_TOKEN_SECRET, { expiresIn: '5m' });
      const req = { cookies: { _docs: token } };

      await isLoggedIn(req, res, next);

      expect(verifySpy).toBeCalledWith(token, config.DOCS_TOKEN_SECRET);
      expect(verifySpy).toBeCalledTimes(1);

      expect(res.redirect).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });
  });

  /* =============== isNotLoggedIn middleware =============== */
  describe('isNotLoggedIn', () => {
    beforeAll(async () => {
      await cleanDB();
    });

    it('should return status 403 and error if config not exist in db', async () => {
      const req = {};

      await isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Opcja zablokowana.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if `use_docs_password` is equal `false`', async () => {
      const req = {};

      await seedConfig({ ...mockedConfig, use_docs_password: false });

      await isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Opcja zablokowana.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if token exist in `req.cookies`', async () => {
      await cleanDB();
      await seedConfig(mockedConfig);

      const token = sign({ id: '123' }, config.DOCS_TOKEN_SECRET, { expiresIn: '5m' });
      const req = { cookies: { _docs: token } };

      await isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Nie możesz być zalogowany.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });

    it('should return `next` function if token not exist in `req.cookies`', async () => {
      const req = {};

      await isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });

    it('should return status 500 and error message if error occurred', async () => {
      const req = {};

      findOneSpy.mockRejectedValueOnce('error');

      await isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledWith(colors.red('error'));
      expect(loggerSpy).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });
  });

  /* =============== isNotUseDocsPassword middleware =============== */
  describe('isNotUseDocsPassword', () => {
    const req = {};

    beforeAll(async () => {
      await cleanDB();
      await seedConfig(mockedConfig);
    });

    it('should return `next` function if `use_docs_password` is equal `true`', async () => {
      await isNotUseDocsPassword(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });

    it('should return status 500 and error message if error occurred', async () => {
      findOneSpy.mockRejectedValueOnce('error');

      await isNotUseDocsPassword(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledWith(colors.red('error'));
      expect(loggerSpy).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 200 if `use_docs_password` is equal `false`', async () => {
      await cleanDB();
      await seedConfig({ ...mockedConfig, use_docs_password: false });

      await isNotUseDocsPassword(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 200 if config not exist in db', async () => {
      await cleanDB();

      await isNotUseDocsPassword(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(0);
    });
  });
});
