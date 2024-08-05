import colors from 'colors/safe';
import decode from 'jwt-decode';
import { verify } from 'jsonwebtoken';
import logger from '@server/logger';
import config from '@server/config';
import User from '@server/api/v1/users/model';
import {
  ApiPermissionRequiredError,
  ApiPermissionNotExistError,
  ApiUnauthorizedError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';

const { AUTH_ERRORS } = errorsConstants;

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) return next();

    const token = authHeader.split(' ')[1];

    if (!token) return next();

    const { exp } = decode(token);

    if ((Math.floor(Date.now() / 1000)) >= exp) return next();

    const user = await verify(token, config.ACCESS_TOKEN_SECRET);

    if (!user?.id) return next();

    req.user = user;
  } catch (error) {
    logger.error(colors.red(error));
  }

  next();
};

export const canManage = (permission = '') => async (req, res, next) => {
  try {
    if (!permission) throw ApiPermissionNotExistError({ permission });

    const user = await User.findOne({
      _id: req.user?.id,
      deleted_at: null,
    }).populate('role').select('role');

    if (!user?.role?.[permission]) {
      throw ApiPermissionRequiredError({ missingPermissions: [permission] });
    }

    next();
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user?.id,
      deleted_at: null,
    }).select('token_version');

    if (!req.user || req.user?.token_version !== user?.token_version) {
      throw ApiUnauthorizedError();
    }

    next();
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const isNotLoggedIn = (req, res, next) => {
  try {
    if (req.user) {
      throw ApiUnauthorizedError({
        key: AUTH_ERRORS.CANNOT_BE_LOGGED_IN_ERROR,
        message: 'Cannot be logged in',
      });
    }

    next();
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
