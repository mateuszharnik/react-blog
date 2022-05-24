// eslint-disable no-console
import colors from 'colors/safe';
import config from '@server/config';
import validateTermsOfUse from '@server/api/v1/termsOfUse/schema';
import TermsOfUse from '@server/api/v1/termsOfUse/model';
import sanitize from '@server/helpers/purify';

const { NODE_ENV } = config;

const seedTermsOfUse = async (termsOfUse = {}) => {
  const { validationError, data } = validateTermsOfUse(termsOfUse, { allowUnknown: true });

  if (validationError) {
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  data.contents = sanitize(data.contents);

  try {
    const newTermsOfUse = await TermsOfUse.create(data);

    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with terms of use.'));

    return newTermsOfUse;
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedTermsOfUse;
