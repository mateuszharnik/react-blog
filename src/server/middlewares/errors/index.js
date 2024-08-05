import config from '@server/config';
import { AppError } from '@server/errors/appError';
import {
  ApiInternalServerError,
  ApiNotFoundUrlError,
  ApiInvalidCSRFTokenError,
} from '@server/utils/errorUtils';

export const notFound = (req, res, next) => {
  next(ApiNotFoundUrlError({ url: req.originalUrl }));
};

export const CSRFErrorHandler = (error, req, res, next) => {
  if (error.code !== 'EBADCSRFTOKEN') return next(error);

  next(ApiInvalidCSRFTokenError());
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  let appError = error;

  if (!(error instanceof AppError)) {
    appError = ApiInternalServerError();
  }

  const {
    status, stack, errorMessage, ...errorDetails
  } = appError;

  const statusCode = status === 200 ? 500 : status;
  const stackDetails = config.NODE_ENV === 'development' ? { stack } : {};

  res.status(statusCode).json({
    ...errorDetails,
    ...stackDetails,
    message: errorMessage,
  });
};
