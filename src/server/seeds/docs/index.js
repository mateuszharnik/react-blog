// eslint-disable no-console
import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import config from '@server/config';
import validateSignIn from '@server/api/v1/docs/schema';
import Docs from '@server/api/v1/docs/model';

const { NODE_ENV, DOCS_PASSWORD } = config;

const seedDocs = async () => {
  const password = { password: DOCS_PASSWORD };

  const { validationError, data } = validateSignIn(password, { allowUnknown: true });

  if (validationError) {
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    data.password = await hash(data.password, 8);

    const newDocs = await Docs.create(data);

    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with docs password.'));

    return newDocs;
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedDocs;
