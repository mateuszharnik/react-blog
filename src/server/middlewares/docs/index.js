import colors from 'colors/safe';
import { verify } from 'jsonwebtoken';
import envConfig from '@server/config';
import logger from '@server/logger';
import Config from '@server/api/v1/config/model';
import { ApiForbiddenError, ApiUnauthorizedError } from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';

const { AUTH_ERRORS, DOCS_ERRORS } = errorsConstants;

export const isLoggedIn = async (req, res, next) => {
  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) return next();

    const token = req.cookies?._docs;

    if (!token) return res.redirect('/docs');

    const decodedToken = await verify(token, envConfig.DOCS_TOKEN_SECRET);

    if (!decodedToken?.id) return res.redirect('/docs');

    next();
  } catch (error) {
    logger.error(colors.red(error));
    return res.redirect('/docs');
  }
};

export const isNotLoggedIn = async (req, res, next) => {
  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) {
      throw ApiForbiddenError({
        key: DOCS_ERRORS.OPTION_DISABLED_ERROR,
        message: 'Option disabled',
      });
    }

    if (req.cookies?._docs) {
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

export const isNotUseDocsPassword = async (req, res, next) => {
  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) return res.status(200).json(true);

    next();
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
