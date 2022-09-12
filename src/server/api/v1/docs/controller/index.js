import colors from 'colors/safe';
import ms from 'ms';
import decode from 'jwt-decode';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '@server/config';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
import Docs from '../model';
import validateSignIn from '../schema';

const { DOCS_TOKEN_SECRET, NODE_ENV } = config;

export const signIn = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateSignIn(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const docs = await Docs.findOne({});

    if (!docs) {
      return responseWithError(404, 'Nie znaleziono konfiguracji dokumentacji.');
    }

    if (!await compare(data.password, docs?.password)) {
      return responseWithError(409, 'Hasło jest nieprawidłowe.');
    }

    const payload = {
      id: docs.id,
    };

    const docsToken = sign(payload, DOCS_TOKEN_SECRET, { expiresIn: '3d' });

    res.cookie('_docs', docsToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/docs',
      secure: NODE_ENV === 'production',
      maxAge: ms('3d'),
    });

    return res.status(200).json({ docsToken });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const getRefreshToken = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const token = req.cookies?._docs;

    if (!token) {
      return res.status(200).json();
    }

    const { exp } = decode(token);

    if ((Math.floor(Date.now() / 1000)) >= exp) {
      res.clearCookie('_docs', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/docs',
        secure: NODE_ENV === 'production',
      });

      return res.status(200).json();
    }

    const decodedToken = await verify(token, DOCS_TOKEN_SECRET);

    const docs = await Docs.findOne({
      _id: decodedToken?.id,
      deleted_at: null,
    });

    if (!docs) {
      res.clearCookie('_docs', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/docs',
        secure: NODE_ENV === 'production',
      });

      return responseWithError(404, 'Nie znaleziono konfiguracji dokumentacji.');
    }

    const payload = {
      id: docs.id,
    };

    const docsToken = sign(payload, DOCS_TOKEN_SECRET, { expiresIn: '3d' });

    res.cookie('_docs', docsToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/docs',
      maxAge: ms('3d'),
      secure: NODE_ENV === 'production',
    });

    return res.status(200).json({ docsToken });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));

    res.clearCookie('_refresh', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/docs',
      secure: NODE_ENV === 'production',
    });

    responseWithError(400, 'Błędny token.');
  }
};

// eslint-disable-next-line no-unused-vars
export const changePassword = async (req, res, next) => {};
