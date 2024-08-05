import config from '@server/config';
import { AppError } from '@server/errors/appError';
import {
  ApiInvalidCSRFTokenError,
  ApiNotFoundError,
  ApiNotFoundUrlError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import { CSRFErrorHandler, notFound, errorHandler } from './index';

const { GLOBAL_ERRORS } = errorsConstants;

jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    NODE_ENV: 'test',
  },
}));

describe('Error middlewares', () => {
  const next = jest.fn();
  const res = {
    status: jest.fn(function status() {
      return this;
    }),
    json: jest.fn(function json() {
      return this;
    }),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* =============== CSRFErrorHandler middleware =============== */
  describe('CSRFErrorHandler', () => {
    it('should return `next` function with error if `error.code` is not equal `EBADCSRFTOKEN`', () => {
      const error = { code: 'test' };
      const req = {};

      CSRFErrorHandler(error, req, res, next);

      expect(next).toBeCalledWith(error);
      expect(next).toBeCalledTimes(1);
    });

    it('should return ApiInvalidCSRFTokenError error if `error.code` is equal `EBADCSRFTOKEN`', () => {
      const error = { code: 'EBADCSRFTOKEN' };
      const req = {};

      CSRFErrorHandler(error, req, res, next);

      expect(next).toBeCalledWith(ApiInvalidCSRFTokenError());
      expect(next).toBeCalledTimes(1);
    });
  });

  /* =============== notFound middleware =============== */
  describe('notFound', () => {
    it('should return ApiNotFoundUrlError error', () => {
      const req = { originalUrl: '/abc' };

      notFound(req, res, next);

      expect(next).toBeCalledWith(ApiNotFoundUrlError({ url: req.originalUrl }));
      expect(next).toBeCalledTimes(1);
    });
  });

  /* =============== errorHandler middleware =============== */
  describe('errorHandler', () => {
    it('should return status 500 and ApiInternalServerError error', () => {
      const req = {};
      const error = new Error('Error');

      errorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(500);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        message: 'Something went wrong',
        key: GLOBAL_ERRORS.INTERNAL_SERVER_ERROR,
      });
      expect(res.json).toBeCalledTimes(1);
    });

    it('should return status 404 and ApiNotFoundError error', () => {
      const req = {};
      const error = ApiNotFoundError();

      errorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(404);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        message: 'Not found',
        key: GLOBAL_ERRORS.NOT_FOUND_ERROR,
      });
      expect(res.json).toBeCalledTimes(1);
    });

    it('should return stack information', () => {
      const req = {};
      const error = new AppError({
        message: 'Not found',
        key: GLOBAL_ERRORS.NOT_FOUND_ERROR,
        status: 404,
        stack: 'stack',
      });

      config.NODE_ENV = 'development';

      errorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(404);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        message: 'Not found',
        key: GLOBAL_ERRORS.NOT_FOUND_ERROR,
        stack: 'stack',
      });
      expect(res.json).toBeCalledTimes(1);
    });
  });
});
