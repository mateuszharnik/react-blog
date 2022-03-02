import colors from 'colors/safe';
import config from '@server/config';
import validateTermsOfUse from '@server/api/v1/termsOfUse/schema';
import TermsOfUse from '@server/api/v1/termsOfUse/model';
import purify from '@server/helpers/purify';

const { NODE_ENV } = config;

const removeAndSeedTermsOfUse = async (termsOfUse = {}) => {
  const { validationError, data } = validateTermsOfUse(termsOfUse, { allowUnknown: true });

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  data.contents = purify(data.contents);

  try {
    await TermsOfUse.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('Terms of use removed from DB.'));

    await TermsOfUse.create(data);

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with terms of use.'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedTermsOfUse;
