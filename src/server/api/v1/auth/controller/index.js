import colors from 'colors/safe';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '@server/config';
import createResponseWithError from '@server/helpers/createResponseWithError';
import User from '@server/api/v1/users/model';
import Role from '@server/api/v1/roles/model';
import { validateSignUp, validateSignIn } from '../schema';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;

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

    const { password, ...rest } = user.toJSON();

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      maxAge: Date.now() + (1000 * 60 * 60 * 24 * 7), // 7d
    });

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

// Rejestracja
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

    const accessToken = sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('_refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/v1/auth/refresh-token',
      maxAge: Date.now() + (1000 * 60 * 60 * 24 * 7), // 7d
    });

    return res.status(200).json({
      user,
      accessToken,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
