import colors from 'colors/safe';
import config from '@server/config';
import validateFAQ from '@server/api/v1/faqs/schema';
import FAQ from '@server/api/v1/faqs/model';

const { NODE_ENV } = config;

const removeAndSeedFAQs = async (faqs = []) => {
  const createdFAQs = [];

  faqs.forEach((faq) => {
    const { validationError, data } = validateFAQ(faq, { allowUnknown: true });

    if (validationError) {
      // eslint-disable-next-line no-console
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    createdFAQs.push(data);
  });

  try {
    await FAQ.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('Frequently asked questions removed from DB.'));

    if (createdFAQs.length) {
      await FAQ.create(createdFAQs);

      // eslint-disable-next-line no-console
      if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with frequently asked questions.'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedFAQs;
