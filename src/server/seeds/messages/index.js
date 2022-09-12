import colors from 'colors/safe';
import config from '@server/config';
import validateMessage from '@server/api/v1/messages/schema';
import Message from '@server/api/v1/messages/model';
import sanitize from '@server/helpers/purify';

const { NODE_ENV, APP_ENV } = config;

const seedMessages = async (messages = []) => {
  const createdMessages = [];

  messages.forEach((message) => {
    const { validationError, data } = validateMessage(message);

    if (validationError) {
      // eslint-disable-next-line no-console
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    data.contents = sanitize(data.contents);

    createdMessages.push({
      ...data,
      is_read: false,
    });
  });

  try {
    if (createdMessages.length) {
      const newMessages = await Message.create(createdMessages);

      // eslint-disable-next-line no-console
      if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('DB seeded with messages.'));

      return newMessages;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedMessages;
