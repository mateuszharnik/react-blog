import config from '@server/config';

export const notFound = (req, res, next) => {
  const error = new Error(JSON.stringify({ message: `Nie znaleziono ${req.originalUrl}` }));
  res.status(404);
  next(error);
};

export const CSRFErrorHandler = (error, req, res, next) => {
  if (error.code !== 'EBADCSRFTOKEN') {
    return next(error);
  }

  res.status(403).json({
    messages: [{ message: 'Wystąpił błąd.' }],
  });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = ({ message, stack }, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  const parsedMessage = JSON.parse(message);

  res.status(status).json({
    messages: Array.isArray(parsedMessage) ? parsedMessage : [parsedMessage],
    stack: config.NODE_ENV === 'development' ? stack : '💩',
  });
};
