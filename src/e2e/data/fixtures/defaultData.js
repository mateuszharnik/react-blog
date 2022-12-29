import colors from 'colors/safe';
import logger from '@server/logger';
import { seedAbout } from '@server/seeds/about';
import { seedConfig } from '@server/seeds/config';
import { seedContact } from '@server/seeds/contact';

const defaultData = async () => {
  try {
    const about = await seedAbout({
      contents: 'Przykładowa strona o blogu.',
    });

    const contact = await seedContact({
      email: 'example@domain.com',
      facebook_url: 'https://www.facebook.com/',
      github_url: 'https://www.github.com/',
      instagram_url: 'https://www.instagram.com/',
      twitter_url: 'https://www.twitter.com/',
    });

    const config = await seedConfig({
      show_authors: false,
      show_email: false,
      show_social_media: true,
      show_comments: true,
      use_slug_url: false,
      use_docs_password: true,
    });

    return {
      about,
      contact,
      config,
    };
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export default defaultData;
