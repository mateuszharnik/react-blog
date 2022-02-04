import colors from 'colors/safe';
import validateMessage from '@server/api/v1/messages/schema';
import Message from '@server/api/v1/messages/model';
import purify from '@server/helpers/purify';

const removeAndSeedMessages = async (messages = []) => {
  const createdMessages = [];

  messages.forEach((message) => {
    const { validationError, data } = validateMessage(message);

    if (validationError) {
      // eslint-disable-next-line no-console
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    data.contents = purify(data.contents);

    createdMessages.push({
      ...data,
      is_read: false,
    });
  });

  try {
    await Message.deleteMany({});

    // eslint-disable-next-line no-console
    console.log(colors.green('Messages removed from DB.'));

    if (createdMessages.length) {
      await Message.create(createdMessages);

      // eslint-disable-next-line no-console
      console.log(colors.green('DB seeded with messages.'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedMessages;
