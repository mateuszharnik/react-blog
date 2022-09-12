import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import config from '@server/config';
import validateSignIn from '@server/api/v1/docs/schema';
import Docs from '@server/api/v1/docs/model';

const { NODE_ENV, APP_ENV, DOCS_PASSWORD } = config;

const seedDocs = async () => {
  const password = { password: DOCS_PASSWORD };

  const { validationError, data } = validateSignIn(password, { allowUnknown: true });

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    data.password = await hash(data.password, 8);

    const newDocs = await Docs.create(data);

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('DB seeded with docs password.'));

    return newDocs;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedDocs;
