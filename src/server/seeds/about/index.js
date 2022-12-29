import colors from 'colors/safe';
import logger from '@server/logger';
import validateAbout from '@server/api/v1/about/schema';
import About from '@server/api/v1/about/model';
import markdownToHTML from '@server/helpers/markdownToHTML';

export const seedAbout = async (about = {}) => {
  try {
    const { validationError, data } = validateAbout(about, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.html_contents = markdownToHTML(data.contents);

    const newAbout = await About.create(data);

    logger.debug(colors.green('DB seeded with information about us.'));

    return JSON.parse(JSON.stringify(newAbout.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeAbout = async () => {
  try {
    await About.deleteMany({});
    logger.debug(colors.green('Information about us removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
