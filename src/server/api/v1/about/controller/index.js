import colors from 'colors/safe';
import logger from '@server/logger';
import markdownToHTML from '@server/helpers/markdownToHTML';
import { ApiBodyValidationError, ApiConflictError, ApiNotFoundError } from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import About from '../model';
import validateAbout from '../schema';

const { ABOUT_ERRORS } = errorsConstants;

export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne({});

    if (!about) {
      throw ApiNotFoundError({
        key: ABOUT_ERRORS.ABOUT_NOT_FOUND_ERROR,
        message: 'About information not found',
      });
    }

    return res.status(200).json(about);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const updateAbout = async (req, res, next) => {
  try {
    const { validationError, data } = validateAbout(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    data.html_contents = markdownToHTML(data.contents);

    const updatedAbout = await About.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedAbout) {
      throw ApiConflictError({
        key: ABOUT_ERRORS.ABOUT_NOT_UPDATED_ERROR,
        message: 'About information not updated',
      });
    }

    return res.status(200).json(updatedAbout);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
