import colors from 'colors/safe';
import ms from 'ms';
import decode from 'jwt-decode';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import config from '@server/config';
import createResponseWithError from '@server/helpers/createResponseWithError';
import User from '@server/api/v1/users/model';
import Role from '@server/api/v1/roles/model';
import { validateSignUp, validateSignIn } from '../schema';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = config;

export const signIn = (isAdmin = false) => async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateSignIn(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
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
      return responseWithError(404, 'Użytkownik nie istnieje.');
    }

    if (!await compare(data.password, user?.password)) {
      return responseWithError(409, 'Hasło jest nieprawidłowe.');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign({
      id: user.id,
      token_version: user.token_version,
    }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    const { token_version, password, ...rest } = user.toJSON();

    return res.status(200).json({
      user: rest,
      accessToken,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const signUp = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateSignUp(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
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
      return responseWithError(409, 'Nazwa użytkownika jest zajęta.');
    }

    if (existingUser?.email === data.email) {
      return responseWithError(409, 'Email jest już używany.');
    }

    data.password = await hash(data.password, 8);

    const role = await Role.findOne({ type: 'USER', deleted_at: null });

    if (!role) {
      return responseWithError(404, 'Nie znaleziono roli użytkownika.');
    }

    const createdUser = await User.create({
      ...data,
      role: role.id,
    });

    if (!createdUser) {
      return responseWithError(409, 'Nie udało się utworzyć konta.');
    }

    const user = await User.findById(createdUser.id).populate('role', '-description -name').select('-password');

    if (!user) {
      return responseWithError(404, 'Użytkownik nie istnieje.');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign({
      id: user.id,
      token_version: user.token_version,
    }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    const { token_version, ...rest } = user.toJSON();

    return res.status(200).json({
      user: rest,
      accessToken,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const getRefreshToken = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const token = req.cookies?._refresh;

    if (!token) {
      return res.status(200).json();
    }

    const { exp } = decode(token);

    if ((Math.floor(Date.now() / 1000)) >= exp) {
      res.clearCookie('_refresh', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/auth/refresh-token',
        secure: NODE_ENV === 'production',
      });

      return res.status(200).json();
    }

    const decodedToken = await verify(token, REFRESH_TOKEN_SECRET);

    const user = await User.findOne({
      _id: decodedToken?.id,
      deleted_at: null,
    }).populate('role', '-description -name').select('-password');

    if (!user) {
      res.clearCookie('_refresh', {
        httpOnly: true,
        sameSite: 'strict',
        path: '/api/v1/auth/refresh-token',
        secure: NODE_ENV === 'production',
      });

      return responseWithError(404, 'Użytkownik nie istnieje.');
    }

    if (user?.token_version !== decodedToken?.token_version) {
      return res.status(200).json();
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = sign({
      id: user.id,
      token_version: user.token_version,
    }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    const { token_version, ...rest } = user.toJSON();

    return res.status(200).json({
      user: rest,
      accessToken,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));

    res.clearCookie('_refresh', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: NODE_ENV === 'production',
    });

    responseWithError(400, 'Błędny token.');
  }
};

export const revokeRefreshToken = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user?.id, deleted_at: null },
      { $inc: { token_version: 1 } },
      { new: true },
    );

    if (!updatedUser) {
      return responseWithError(409, 'Wystąpił błąd.');
    }

    const refreshToken = sign({
      id: updatedUser.id,
      token_version: updatedUser.token_version,
    }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: NODE_ENV === 'production',
      maxAge: ms('7d'),
    });

    return res.status(200).json({ message: 'Pomyślnie wylogowano z wszystkich urządzeń.' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const signOut = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    res.clearCookie('_refresh', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      secure: NODE_ENV === 'production',
    });

    return res.status(200).json({ message: 'Pomyślnie wylogowano.' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
