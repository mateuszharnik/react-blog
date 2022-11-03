import colors from 'colors/safe';
import logger from '@server/logger';
import validateTermsOfUse from '@server/api/v1/termsOfUse/schema';
import TermsOfUse from '@server/api/v1/termsOfUse/model';
import sanitize from '@server/helpers/purify';

export const seedTermsOfUse = async (termsOfUse = {}) => {
  try {
    const { validationError, data } = validateTermsOfUse(termsOfUse, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.name = sanitize(data.name);
    data.contents = sanitize(data.contents);

    const newTermsOfUse = await TermsOfUse.create(data);

    logger.debug(colors.green('DB seeded with terms of use.'));

    return JSON.parse(JSON.stringify(newTermsOfUse.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeTermsOfUse = async () => {
  try {
    await TermsOfUse.deleteMany({});
    logger.debug(colors.green('Terms of use removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
