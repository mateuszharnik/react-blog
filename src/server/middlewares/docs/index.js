import colors from 'colors/safe';
import { verify } from 'jsonwebtoken';
import envConfig from '@server/config';
import logger from '@server/logger';
import Config from '@server/api/v1/config/model';
import createResponseWithError from '@server/helpers/createResponseWithError';

export const isLoggedIn = async (req, res, next) => {
  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) {
      return next();
    }

    const token = req.cookies?._docs;

    if (!token) return res.redirect('/docs');

    const decodedToken = await verify(token, envConfig.DOCS_TOKEN_SECRET);

    if (!decodedToken?.id) return res.redirect('/docs');
  } catch (error) {
    logger.error(colors.red(error));
    return res.redirect('/docs');
  }

  next();
};

export const isNotLoggedIn = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) {
      return responseWithError(403, 'Opcja zablokowana.');
    }

    if (req.cookies?._docs) {
      return responseWithError(403, 'Nie możesz być zalogowany.');
    }
  } catch (error) {
    logger.error(colors.red(error));
    return responseWithError();
  }

  next();
};

export const isNotUseDocsPassword = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) {
      return res.status(200).json();
    }
  } catch (error) {
    logger.error(colors.red(error));
    return responseWithError();
  }

  next();
};
