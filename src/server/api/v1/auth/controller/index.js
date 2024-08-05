import colors from 'colors/safe';
import ms from 'ms';
import decode from 'jwt-decode';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '@server/config';
import logger from '@server/logger';
import User from '@server/api/v1/users/model';
import Role from '@server/api/v1/roles/model';
import {
  ApiBodyValidationError, ApiNotFoundError, ApiBadRequestError, ApiConflictError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import { validateSignUp, validateSignIn } from '../schema';

const { TOKEN_ERRORS, ROLE_ERRORS, USER_ERRORS } = errorsConstants;

export const signIn = (isAdmin = false) => async (req, res, next) => {
  try {
    const { validationError, data } = validateSignIn(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const user = await User.findOne({
      $or: [
        { email: data.username },
        { username: data.username.toLowerCase() },
      ],
      deleted_at: null,
    }).populate('role', '-description -name');

    const isCorrectType = isAdmin ? user?.role?.type === 'USER' : user?.role?.type !== 'USER';

    if (!user || isCorrectType) {
      throw ApiNotFoundError({
        key: USER_ERRORS.USER_NOT_FOUND_ERROR,
        message: 'User not found',
      });
    }

    if (!await compare(data.password, user?.password)) {
      throw ApiConflictError({
        key: USER_ERRORS.PASSWORD_NOT_CORRECT_ERROR,
        message: 'Password not correct',
      });
    }

    const payload = {
      id: user.id,
      token_version: user.token_version,
    };

    const accessToken = sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    const { token_version, password, ...rest } = user.toJSON();

    return res.status(200).json({
      user: rest,
      accessToken,
    });
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { validationError, data } = validateSignUp(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    delete data.confirm_password;
    data.display_name = data.username;
    data.username = data.username.toLowerCase();

    const existingUser = await User.findOne({
      $or: [
        { email: data.email },
        { username: data.username },
      ],
      deleted_at: null,
    });

    if (existingUser?.username === data.username) {
      throw ApiConflictError({
        key: USER_ERRORS.USERNAME_ALREADY_EXIST_ERROR,
        message: 'Username is already taken',
      });
    }

    if (existingUser?.email === data.email) {
      throw ApiConflictError({
        key: USER_ERRORS.EMAIL_ALREADY_EXIST_ERROR,
        message: 'Email is already taken',
      });
    }

    data.password = await hash(data.password, 8);

    const role = await Role.findOne({ type: 'USER', deleted_at: null });

    if (!role) {
      throw ApiNotFoundError({
        key: ROLE_ERRORS.ROLE_NOT_FOUND_ERROR,
        message: 'Role not found',
      });
    }

    const createdUser = await User.create({
      ...data,
      role: role.id,
    });

    if (!createdUser) {
      throw ApiConflictError({
        key: USER_ERRORS.USER_NOT_CREATED_ERROR,
        message: 'User not created',
      });
    }

    const user = await User.findById(createdUser.id).populate('role', '-description -name').select('-password');

    if (!user) {
      throw ApiNotFoundError({
        key: USER_ERRORS.USER_NOT_FOUND_ERROR,
        message: 'User not found',
      });
    }

    const payload = {
      id: user.id,
      token_version: user.token_version,
    };

    const accessToken = sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    const { token_version, ...rest } = user.toJSON();

    return res.status(200).json({
      user: rest,
      accessToken,
    });
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getRefreshToken = async (req, res, next) => {
  const silent = !!req.query?.silent;

  try {
    const token = req.cookies?._refresh;

    if (!token) {
      if (silent) return res.status(200).json();

      throw ApiBadRequestError({
        key: TOKEN_ERRORS.INVALID_REFRESH_TOKEN_ERROR,
        message: 'Invalid refresh token',
      });
    }

    const { exp } = decode(token);

    if ((Math.floor(Date.now() / 1000)) >= exp) {
      res.clearCookie('_refresh', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/auth/refresh-token',
        secure: config.NODE_ENV === 'production',
      });

      if (silent) return res.status(200).json();

      throw ApiBadRequestError({
        key: TOKEN_ERRORS.INVALID_REFRESH_TOKEN_ERROR,
        message: 'Invalid refresh token',
      });
    }

    const decodedToken = await verify(token, config.REFRESH_TOKEN_SECRET);

    const user = await User.findOne({
      _id: decodedToken?.id,
      deleted_at: null,
    }).populate('role', '-description -name').select('-password');

    if (!user) {
      res.clearCookie('_refresh', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/auth/refresh-token',
        secure: config.NODE_ENV === 'production',
      });

      throw ApiNotFoundError({
        key: USER_ERRORS.USER_NOT_FOUND_ERROR,
        message: 'User not found',
      });
    }

    if (user?.token_version !== decodedToken?.token_version) {
      if (silent) return res.status(200).json();

      throw ApiBadRequestError({
        key: TOKEN_ERRORS.INVALID_REFRESH_TOKEN_ERROR,
        message: 'Invalid refresh token',
      });
    }

    const payload = {
      id: user.id,
      token_version: user.token_version,
    };

    const accessToken = sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    return res.status(200).json(accessToken);
  } catch (error) {
    logger.error(colors.red(error));

    res.clearCookie('_refresh', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
    });

    next(error);
  }
};

export const revokeRefreshToken = async (req, res, next) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user?.id, deleted_at: null },
      { $inc: { token_version: 1 } },
      { new: true },
    );

    if (!updatedUser) {
      res.clearCookie('_refresh', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/auth/refresh-token',
        secure: config.NODE_ENV === 'production',
      });

      throw ApiNotFoundError({
        key: USER_ERRORS.USER_NOT_FOUND_ERROR,
        message: 'User not found',
      });
    }

    const payload = {
      id: updatedUser.id,
      token_version: updatedUser.token_version,
    };

    const accessToken = sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    return res.status(200).json(accessToken);
  } catch (error) {
    logger.error(colors.red(error));

    res.clearCookie('_refresh', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
    });

    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('_refresh', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: config.NODE_ENV === 'production',
    });

    return res.status(200).json(true);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
