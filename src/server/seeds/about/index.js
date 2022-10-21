import colors from 'colors/safe';
import logger from '@server/logger';
import validateAbout from '@server/api/v1/about/schema';
import About from '@server/api/v1/about/model';
import markdownToHTML from '@server/helpers/markdownToHTML';

const seedAbout = async (about = {}) => {
  const { validationError, data } = validateAbout(about);

  if (validationError) {
    logger.error(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  data.html_contents = markdownToHTML(data.contents);

  try {
    const newAbout = await About.create(data);

    logger.debug(colors.green('DB seeded with information about us.'));

    return newAbout;
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedAbout;
