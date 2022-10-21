import colors from 'colors/safe';
import logger from '@server/logger';
import validateTermsOfUse from '@server/api/v1/termsOfUse/schema';
import TermsOfUse from '@server/api/v1/termsOfUse/model';
import sanitize from '@server/helpers/purify';

const seedTermsOfUse = async (termsOfUse = {}) => {
  const { validationError, data } = validateTermsOfUse(termsOfUse, { allowUnknown: true });

  if (validationError) {
    logger.error(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  data.contents = sanitize(data.contents);

  try {
    const newTermsOfUse = await TermsOfUse.create(data);

    logger.debug(colors.green('DB seeded with terms of use.'));

    return newTermsOfUse;
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedTermsOfUse;
