import colors from 'colors/safe';
import { verify } from 'jsonwebtoken';
import envConfig from '@server/config';
import Config from '@server/api/v1/config/model';
import createResponseWithError from '@server/helpers/createResponseWithError';

const { DOCS_TOKEN_SECRET } = envConfig;

export const isLoggedIn = async (req, res, next) => {
  try {
    const config = await Config.findOne({});

    if (!config?.use_docs_password) {
      return next();
    }

    const token = req.cookies?._docs;

    if (!token) return res.redirect('/dokumentacja');

    const decodedToken = await verify(token, DOCS_TOKEN_SECRET);

    if (!decodedToken) return res.redirect('/dokumentacja');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    return res.redirect('/dokumentacja');
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
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
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
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }

  next();
};
