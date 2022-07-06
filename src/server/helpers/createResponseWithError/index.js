const createResponseWithError = (res, next) => (status = 500, message = 'Wystąpił błąd.') => {
  const error = new Error(JSON.stringify(Array.isArray(message) ? message : { message }));
  res.status(status);
  next(error);
};

export default createResponseWithError;
