import colors from 'colors/safe';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
import validateId from '@server/helpers/validation/validateId';
import validateIds from '@server/helpers/validation/validateIds';
import sanitize from '@server/helpers/purify';
import Message from '../model';
import validateMessage from '../schema';

export const countMessages = (isRead = null) => async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  const query = { deleted_at: null };

  if (isRead !== null) {
    query.is_read = !!isRead;
  }

  try {
    const messages = await Message.count(query);

    return res.status(200).json({ messages });
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const getMessages = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const messages = await Message.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(messages);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const getMessage = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const message = await Message.findOne({ _id: id, deleted_at: null });

    if (!message) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    const updatedMessage = await Message.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { is_read: true },
      { new: true },
    );

    if (!updatedMessage) {
      return responseWithError(409, 'Nie udało się zaktualizować wiadomości.');
    }

    return res.status(200).json(updatedMessage);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const createMessage = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateMessage(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const createdMessage = await Message.create({
      ...data,
      is_read: false,
    });

    if (!createdMessage) {
      return responseWithError(409, 'Nie udało się wysłać wiadomości.');
    }

    return res.status(201).json(createdMessage);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const deleteMessages = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const query = { deleted_at: null };

    if (req.body?.length) {
      const { validationError, data } = validateIds(req.body);

      if (validationError) {
        return responseWithError(409, mapValidationMessages(validationError));
      }

      query._id = { $in: data };
    }

    const messages = await Message.find(query);

    if (!messages?.length) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    const ids = messages.map(({ _id }) => _id.toString());

    const updatedMessages = await Message.softDeleteMany(
      { _id: { $in: ids }, deleted_at: null },
      { new: true },
    );

    if (!updatedMessages) {
      return responseWithError(409, 'Nie udało się usunąć wiadomości.');
    }

    const deletedMessages = await Message.find({ _id: { $in: ids }, deleted_at: { $ne: null } });

    if (!deletedMessages?.length) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    return res.status(200).json(deletedMessages);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const message = await Message.findOne({ _id: id, deleted_at: null });

    if (!message) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    const deletedMessage = await Message.findOneAndSoftDelete(
      { _id: id, deleted_at: null },
      { new: true },
    );

    if (!deletedMessage) {
      return responseWithError(409, 'Nie udało się usunąć wiadomości.');
    }

    return res.status(200).json(deletedMessage);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};
