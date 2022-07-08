// eslint-disable no-console
import colors from 'colors/safe';
import config from '@server/config';
import validateAbout from '@server/api/v1/about/schema';
import About from '@server/api/v1/about/model';
import markdownToHTML from '@server/helpers/markdownToHTML';

const { NODE_ENV } = config;

const seedAbout = async (about = {}) => {
  const { validationError, data } = validateAbout(about);

  if (validationError) {
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  data.html_contents = markdownToHTML(data.contents);

  try {
    const newAbout = await About.create(data);
    console.log(process.env.NODE_ENV);
    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with information about us.'));

    return newAbout;
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedAbout;
