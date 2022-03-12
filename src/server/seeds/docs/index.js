import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import config from '@server/config';
import validateSignIn from '@server/api/v1/docs/schema';
import Docs from '@server/api/v1/docs/model';

const { NODE_ENV, DOCS_PASSWORD } = config;

const removeAndSeedDocs = async () => {
  const password = { password: DOCS_PASSWORD };

  const { validationError, data } = validateSignIn(password, { allowUnknown: true });

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    data.password = await hash(data.password, 8);

    await Docs.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('Docs password removed from DB.'));

    await Docs.create(data);

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with docs password.'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedDocs;
