import colors from 'colors/safe';
import logger from '@server/logger';
import User from '@server/api/v1/users/model';
import { ApiNotFoundError } from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';

const { USER_ERRORS } = errorsConstants;

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
      deleted_at: null,
    }).populate('role');

    if (!user) {
      throw ApiNotFoundError({
        key: USER_ERRORS.USER_NOT_FOUND_ERROR,
        message: 'User not found',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
