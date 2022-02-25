import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import Config from '../model';
import validateConfig from '../schema';

export const getConfig = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const config = await Config.findOne({});

    if (!config) {
      return responseWithError(404, 'Nie znaleziono ustawień strony.');
    }

    return res.status(200).json(config);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const updateConfig = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateConfig(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const updatedConfig = await Config.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedConfig) {
      return responseWithError(409, 'Nie udało się zaktualizować ustawień strony.');
    }

    return res.status(200).json(updatedConfig);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
