import config from '@server/config';
import { CSRFErrorHandler, notFound, errorHandler } from './index';

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

      expect(res.status).toBeCalledTimes(0);
      expect(res.json).toBeCalledTimes(0);

      expect(next).toBeCalledWith(error);
      expect(next).toBeCalledTimes(1);
    });

    it('should return status 403 and error message if `error.code` is equal `EBADCSRFTOKEN`', () => {
      const error = { code: 'EBADCSRFTOKEN' };
      const req = {};

      CSRFErrorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(403);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        messages: [{ message: 'Wystąpił błąd.' }],
      });
      expect(res.json).toBeCalledTimes(1);

      expect(next).toBeCalledTimes(0);
    });
  });

  /* =============== notFound middleware =============== */
  describe('notFound', () => {
    it('should return status 404 and `next` function with error', () => {
      const error = new Error(JSON.stringify({ message: 'Nie znaleziono /abc' }));
      const req = { originalUrl: '/abc' };

      notFound(req, res, next);

      expect(res.status).toBeCalledWith(404);
      expect(res.status).toBeCalledTimes(1);

      expect(next).toBeCalledWith(error);
      expect(next).toBeCalledTimes(1);
    });
  });

  /* =============== errorHandler middleware =============== */
  describe('errorHandler', () => {
    it('should return status 500 and array with 2 messages', () => {
      const req = {};
      const error = {
        message: JSON.stringify([{ message: 'Wystąpił błąd 1.' }, { message: 'Wystąpił błąd 2.' }]),
        stack: 'stack',
      };

      res.statusCode = 200;

      errorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(500);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        messages: [{ message: 'Wystąpił błąd 1.' }, { message: 'Wystąpił błąd 2.' }],
        stack: '💩',
      });
      expect(res.json).toBeCalledTimes(1);
    });

    it('should return status 404 and array with message', () => {
      const req = {};
      const error = {
        message: JSON.stringify({ message: 'Wystąpił błąd 1.' }),
        stack: 'stack',
      };

      res.statusCode = 404;

      errorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(404);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        messages: [{ message: 'Wystąpił błąd 1.' }],
        stack: '💩',
      });
      expect(res.json).toBeCalledTimes(1);
    });

    it('should return stack information', () => {
      const req = {};
      const error = {
        message: JSON.stringify({ message: 'Wystąpił błąd 1.' }),
        stack: 'stack',
      };

      res.statusCode = 404;
      config.NODE_ENV = 'development';

      errorHandler(error, req, res, next);

      expect(res.status).toBeCalledWith(404);
      expect(res.status).toBeCalledTimes(1);

      expect(res.json).toBeCalledWith({
        messages: [{ message: 'Wystąpił błąd 1.' }],
        stack: 'stack',
      });
      expect(res.json).toBeCalledTimes(1);
    });
  });
});
