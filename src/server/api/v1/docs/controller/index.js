import colors from 'colors/safe';
import ms from 'ms';
import decode from 'jwt-decode';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '@server/config';
import logger from '@server/logger';
import { ApiNotFoundError, ApiConflictError, ApiBodyValidationError } from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import Docs from '../model';
import validateSignIn from '../schema';

const { DOCS_ERRORS } = errorsConstants;

export const signIn = async (req, res, next) => {
  try {
    const { validationError, data } = validateSignIn(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const docs = await Docs.findOne({});

    if (!docs) {
      throw ApiNotFoundError({
        key: DOCS_ERRORS.CONFIGURATION_NOT_FOUND_ERROR,
        message: 'Configuration not found',
      });
    }

    if (!await compare(data.password, docs?.password)) {
      throw ApiConflictError({
        key: DOCS_ERRORS.PASSWORD_NOT_CORRECT_ERROR,
        message: 'Password not correct',
      });
    }

    const payload = {
      id: docs.id,
    };

    const docsToken = sign(payload, config.DOCS_TOKEN_SECRET, { expiresIn: '3d' });

    res.cookie('_docs', docsToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/docs',
      secure: config.NODE_ENV === 'production',
      maxAge: ms('3d'),
    });

    return res.status(200).json(true);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?._docs;

    if (!token) {
      return res.status(200).json(false);
    }

    const { exp } = decode(token);

    if ((Math.floor(Date.now() / 1000)) >= exp) {
      res.clearCookie('_docs', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/docs',
        secure: config.NODE_ENV === 'production',
      });

      return res.status(200).json(false);
    }

    const decodedToken = await verify(token, config.DOCS_TOKEN_SECRET);

    const docs = await Docs.findOne({
      _id: decodedToken?.id,
      deleted_at: null,
    });

    if (!docs) {
      res.clearCookie('_docs', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/docs',
        secure: config.NODE_ENV === 'production',
      });

      throw ApiNotFoundError({
        key: DOCS_ERRORS.CONFIGURATION_NOT_FOUND_ERROR,
        message: 'Configuration not found',
      });
    }

    const payload = {
      id: docs.id,
    };

    const docsToken = sign(payload, config.DOCS_TOKEN_SECRET, { expiresIn: '3d' });

    res.cookie('_docs', docsToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/docs',
      maxAge: ms('3d'),
      secure: config.NODE_ENV === 'production',
    });

    return res.status(200).json(true);
  } catch (error) {
    logger.error(colors.red(error));

    res.clearCookie('_docs', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/docs',
      secure: config.NODE_ENV === 'production',
    });

    next(error);
  }
};

// eslint-disable-next-line no-unused-vars
export const changePassword = async (req, res, next) => {};
