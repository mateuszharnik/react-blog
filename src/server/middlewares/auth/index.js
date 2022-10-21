import colors from 'colors/safe';
import decode from 'jwt-decode';
import { verify } from 'jsonwebtoken';
import logger from '@server/logger';
import config from '@server/config';
import createResponseWithError from '@server/helpers/createResponseWithError';

const { ACCESS_TOKEN_SECRET } = config;

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) return next();

    const token = authHeader.split(' ')[1];

    if (!token) return next();

    const { exp } = decode(token);

    if ((Math.floor(Date.now() / 1000)) >= exp) return next();

    const user = await verify(token, ACCESS_TOKEN_SECRET);

    if (!user) return next();

    req.user = user;
  } catch (error) {
    logger.error(colors.red(error));
  }

  next();
};

export const canManage = (manageName = '') => (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  if (!manageName || !req.user?.role?.[manageName]) {
    return responseWithError(403, 'Brak dostępu.');
  }

  next();
};

export const isLoggedIn = (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  if (!req.user) {
    return responseWithError(401, 'Musisz być zalogowany.');
  }

  next();
};

export const isNotLoggedIn = (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  if (req.user) {
    return responseWithError(403, 'Nie możesz być zalogowany.');
  }

  next();
};
