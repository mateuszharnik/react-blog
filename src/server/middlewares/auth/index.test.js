import decode from 'jwt-decode';
import colors from 'colors/safe';
import jwt, { sign, JsonWebTokenError } from 'jsonwebtoken';
import config from '@server/config';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import {
  checkToken,
  canManage,
  isLoggedIn,
  isNotLoggedIn,
} from './index';

jest.mock('../../helpers/createResponseWithError');
jest.mock('jwt-decode', () => {
  const originalDecode = jest.requireActual('jwt-decode');

  return jest.fn(originalDecode);
});

describe('Auth middlewares', () => {
  const res = {};
  const next = jest.fn();

  const responseWithError = jest.fn();
  createResponseWithError.mockImplementation(() => responseWithError);

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* =============== checkToken middleware =============== */
  describe('checkToken', () => {
    const req = {};

    const loggerSpy = jest.spyOn(logger, 'error');
    const verifySpy = jest.spyOn(jwt, 'verify');

    it('should log error message if `req` is empty object', async () => {
      await checkToken(req, res, next);

      expect(decode).toBeCalledTimes(0);

      expect(verifySpy).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(1);
    });

    it('should return `next` function if authorization header not exist', async () => {
      req.get = jest.fn().mockImplementation((header) => (header === 'Authorization' ? null : 'Bearer token'));

      await checkToken(req, res, next);

      expect(req.get).toBeCalledTimes(1);
      expect(req.get).toBeCalledWith('Authorization');

      expect(decode).toBeCalledTimes(0);

      expect(verifySpy).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
      expect(req.user).toEqual(undefined);
    });

    it('should return `next` function if token in authorization header not exist', async () => {
      req.get = jest.fn().mockImplementation((header) => (header === 'Authorization' ? 'Bearer' : null));

      await checkToken(req, res, next);

      expect(req.get).toBeCalledTimes(1);
      expect(req.get).toBeCalledWith('Authorization');

      expect(decode).toBeCalledTimes(0);

      expect(verifySpy).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
      expect(req.user).toEqual(undefined);
    });

    it('should return `next` function if token has expired', async () => {
      const token = sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '-5d' });

      req.get = jest.fn().mockImplementation((header) => (header === 'Authorization' ? `Bearer ${token}` : null));

      await checkToken(req, res, next);

      expect(req.get).toBeCalledTimes(1);
      expect(req.get).toBeCalledWith('Authorization');

      expect(decode).toBeCalledTimes(1);
      expect(decode).toBeCalledWith(token);

      expect(verifySpy).toBeCalledTimes(0);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
      expect(req.user).toEqual(undefined);
    });

    it('should return `next` function if token is invalid', async () => {
      const token = sign({}, 'invalid_token', { expiresIn: '5m' });

      req.get = jest.fn().mockImplementation((header) => (header === 'Authorization' ? `Bearer ${token}` : null));

      await checkToken(req, res, next);

      expect(req.get).toBeCalledTimes(1);
      expect(req.get).toBeCalledWith('Authorization');

      expect(decode).toBeCalledTimes(1);
      expect(decode).toBeCalledWith(token);

      expect(verifySpy).toBeCalledTimes(1);
      expect(verifySpy).toBeCalledWith(token, config.ACCESS_TOKEN_SECRET);

      expect(loggerSpy).toBeCalledTimes(1);
      expect(loggerSpy).toBeCalledWith(colors.red(new JsonWebTokenError('invalid signature')));

      expect(next).toBeCalledTimes(1);
      expect(req.user).toEqual(undefined);
    });

    it('should return `next` function if token is valid but `id` prop not exist', async () => {
      const token = sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });

      req.get = jest.fn().mockImplementation((header) => (header === 'Authorization' ? `Bearer ${token}` : null));

      await checkToken(req, res, next);

      expect(req.get).toBeCalledTimes(1);
      expect(req.get).toBeCalledWith('Authorization');

      expect(decode).toBeCalledTimes(1);
      expect(decode).toBeCalledWith(token);

      expect(verifySpy).toBeCalledTimes(1);
      expect(verifySpy).toBeCalledWith(token, config.ACCESS_TOKEN_SECRET);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
      expect(req.user).toEqual(undefined);
    });

    it('should return user and `next` function if token is valid', async () => {
      const token = sign({ id: '123' }, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });

      req.get = jest.fn().mockImplementation((header) => (header === 'Authorization' ? `Bearer ${token}` : null));

      await checkToken(req, res, next);

      expect(req.get).toBeCalledTimes(1);
      expect(req.get).toBeCalledWith('Authorization');

      expect(decode).toBeCalledTimes(1);
      expect(decode).toBeCalledWith(token);

      expect(verifySpy).toBeCalledTimes(1);
      expect(verifySpy).toBeCalledWith(token, config.ACCESS_TOKEN_SECRET);

      expect(loggerSpy).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
      expect(req.user).toStrictEqual({
        id: '123',
        exp: expect.any(Number),
        iat: expect.any(Number),
      });
    });
  });

  /* =============== isLoggedIn middleware =============== */
  describe('isLoggedIn', () => {
    it('should return status 401 and error if user is not logged in', () => {
      const req = {};

      isLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(401, 'Musisz być zalogowany.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return `next` function if user is logged in', () => {
      const req = { user: true };

      isLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });
  });

  /* =============== isNotLoggedIn middleware =============== */
  describe('isNotLoggedIn', () => {
    it('should return status 403 and error if user is logged in', () => {
      const req = { user: true };

      isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Nie możesz być zalogowany.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return `next` function if user is not logged in', () => {
      const req = {};

      isNotLoggedIn(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });
  });

  /* =============== canManage middleware =============== */
  describe('canManage', () => {
    it('should return status 403 and error if we pass empty string to the function and role not exist', () => {
      const req = {};

      canManage()(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if we pass `true` and role not exist', () => {
      const req = {};

      canManage(true)(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if we pass `false` and role not exist', () => {
      const req = {};

      canManage(false)(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if we pass empty string and role exist', () => {
      const req = { user: { role: { test: true } } };

      canManage('')(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if we pass `true` and role exist', () => {
      const req = { user: { role: { test: true } } };

      canManage(true)(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if we pass `false` and role exist', () => {
      const req = { user: { role: { test: true } } };

      canManage(false)(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return status 403 and error if we pass role that not exist', () => {
      const req = { user: { role: { test: true } } };

      canManage('foo')(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledWith(403, 'Brak dostępu.');
      expect(responseWithError).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });

    it('should return `next` function if we pass valid role name', () => {
      const req = { user: { role: { test: true } } };

      canManage('test')(req, res, next);

      expect(createResponseWithError).toBeCalledWith(res, next);
      expect(createResponseWithError).toBeCalledTimes(1);

      expect(responseWithError).toBeCalledTimes(0);

      expect(next).toBeCalledTimes(1);
    });
  });
});
