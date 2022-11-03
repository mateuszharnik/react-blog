import colors from 'colors/safe';
import logger from '@server/logger';
import validateMessage from '@server/api/v1/messages/schema';
import Message from '@server/api/v1/messages/model';
import sanitize from '@server/helpers/purify';

export const seedMessages = async (message = {}) => {
  try {
    const { validationError, data } = validateMessage(message, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.subject = sanitize(data.subject);
    data.contents = sanitize(data.contents);

    const newMessage = await Message.create(data);

    logger.debug(colors.green('DB seeded with message.'));

    return JSON.parse(JSON.stringify(newMessage.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeMessages = async () => {
  try {
    await Message.deleteMany({});
    logger.debug(colors.green('Messages removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
