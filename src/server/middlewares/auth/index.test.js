import decode from 'jwt-decode';
import colors from 'colors/safe';
import jwt, { sign, JsonWebTokenError } from 'jsonwebtoken';
import config from '@server/config';
import logger from '@server/logger';
import { seedUsers } from '@server/seeds/users';
import { seedRoles } from '@server/seeds/roles';
import { mockedAdmin } from '@server/mocks/users';
import { mockedAdminRole } from '@server/mocks/roles';
import {
  ApiPermissionRequiredError,
  ApiPermissionNotExistError,
  ApiUnauthorizedError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import {
  checkToken,
  canManage,
  isLoggedIn,
  isNotLoggedIn,
} from './index';

const { AUTH_ERRORS } = errorsConstants;

jest.mock('jwt-decode', () => {
  const originalDecode = jest.requireActual('jwt-decode');

  return jest.fn(originalDecode);
});

describe('Auth middlewares', () => {
  const res = {};
  const next = jest.fn();
  let user = null;

  const loggerSpy = jest.spyOn(logger, 'error');

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const adminRole = await seedRoles(mockedAdminRole);
    user = await seedUsers({ ...mockedAdmin, role: adminRole.id });
  });

  /* =============== checkToken middleware =============== */
  describe('checkToken', () => {
    const req = {};

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
    it('should return ApiUnauthorizedError error if user is not logged in', async () => {
      const req = {};

      await isLoggedIn(req, res, next);

      expect(next).toBeCalledWith(ApiUnauthorizedError());
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return `next` function if user is logged in', async () => {
      const req = { user };

      await isLoggedIn(req, res, next);

      expect(next).toBeCalledWith();
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);
    });
  });

  /* =============== isNotLoggedIn middleware =============== */
  describe('isNotLoggedIn', () => {
    it('should return ApiUnauthorizedError error if user is logged in', () => {
      const req = { user };

      isNotLoggedIn(req, res, next);

      expect(next).toBeCalledWith(ApiUnauthorizedError({
        key: AUTH_ERRORS.CANNOT_BE_LOGGED_IN_ERROR,
        message: 'Cannot be logged in',
      }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return `next` function if user is not logged in', () => {
      const req = {};

      isNotLoggedIn(req, res, next);

      expect(next).toBeCalledWith();
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);
    });
  });

  /* =============== canManage middleware =============== */
  describe('canManage', () => {
    it('should return ApiPermissionNotExistError error if we pass empty string to the function and role not exist', async () => {
      const req = {};

      await canManage()(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionNotExistError({ permission: undefined }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return ApiPermissionRequiredError error if we pass `true` and role not exist', async () => {
      const req = {};
      const permission = true;

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionRequiredError({ missingPermissions: [permission] }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return ApiPermissionNotExistError error if we pass `false` and role not exist', async () => {
      const req = {};
      const permission = false;

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionNotExistError({ permission }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return ApiPermissionNotExistError error if we pass empty string and role exist', async () => {
      const req = { user };
      const permission = '';

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionNotExistError({ permission }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return ApiPermissionRequiredError error if we pass `true` and role exist', async () => {
      const req = { user };
      const permission = true;

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionRequiredError({ missingPermissions: [permission] }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return ApiPermissionNotExistError error if we pass `false` and role exist', async () => {
      const req = { user };
      const permission = false;

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionNotExistError({ permission }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return ApiPermissionRequiredError error if we pass role that not exist', async () => {
      const req = { user };
      const permission = 'foo';

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith(ApiPermissionRequiredError({ missingPermissions: [permission] }));
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('should return `next` function if we pass valid role name', async () => {
      const req = { user };
      const permission = 'can_manage_contact';

      await canManage(permission)(req, res, next);

      expect(next).toBeCalledWith();
      expect(next).toBeCalledTimes(1);

      expect(loggerSpy).toBeCalledTimes(0);
    });
  });
});
