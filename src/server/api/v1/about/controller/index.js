import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import purify from '@server/helpers/purify';
import About from '../model';
import validateAbout from '../schema';

export const getAbout = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const about = await About.findOne({});

    if (!about) {
      return responseWithError(404, 'Nie znaleziono informacji o blogu.');
    }

    return res.status(200).json(about);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const updateAbout = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    req.body.contents = purify(req.body.contents);

    const { validationError, data } = validateAbout(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const updatedAbout = await About.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedAbout) {
      return responseWithError(409, 'Nie udało się zaktualizować informacji o blogu.');
    }

    return res.status(200).json(updatedAbout);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};