import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import validateId from '@server/helpers/validation/validateId';
import validateIds from '@server/helpers/validation/validateIds';
import sanitize from '@server/helpers/purify';
import Message from '../model';
import validateMessage from '../schema';

export const countMessages = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const messages = await Message.count({ deleted_at: null });

    return res.status(200).json({ messages });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const countReadMessages = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const messages = await Message.count({ deleted_at: null, is_read: true });

    return res.status(200).json({ messages });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const countNewMessages = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const messages = await Message.count({ deleted_at: null, is_read: false });

    return res.status(200).json({ messages });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const getMessages = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const messages = await Message.find({ deleted_at: null }).sort({ created_at: -1 });

    if (!messages?.length) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    return res.status(200).json(messages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
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
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const createMessage = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateMessage(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
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
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
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
        return responseWithError(409, validationError.details[0].message);
      }

      query._id = { $in: data };
    }

    const messages = await Message.find(query);

    if (!messages?.length) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    const updatedMessages = await Message.updateMany(
      query,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!updatedMessages) {
      return responseWithError(409, 'Nie udało się usunąć wiadomości.');
    }

    const ids = messages.map(({ _id }) => _id.toString());

    const deletedMessages = await Message.find({ _id: { $in: ids }, deleted_at: { $ne: null } });

    if (!deletedMessages?.length) {
      return responseWithError(404, 'Nie znaleziono wiadomości.');
    }

    return res.status(200).json(deletedMessages);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
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

    const deletedMessage = await Message.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedMessage) {
      return responseWithError(409, 'Nie udało się usunąć wiadomości.');
    }

    return res.status(200).json(deletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
