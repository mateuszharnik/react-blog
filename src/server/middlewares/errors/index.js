import config from '@server/config';

const { NODE_ENV } = config;

export const notFound = (req, res, next) => {
  const error = new Error(`Nie znaleziono ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = ({ message, stack }, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message,
    stack: NODE_ENV === 'production' ? '💩' : stack,
  });
};
