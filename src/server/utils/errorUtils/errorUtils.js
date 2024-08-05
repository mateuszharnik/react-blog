import { AppError } from '@server/errors/appError';
import { errorsConstants } from '@shared/constants';

const {
  GLOBAL_ERRORS,
  PERMISSION_ERRORS,
  VALIDATION_ERRORS,
  TOKEN_ERRORS,
} = errorsConstants;

export const ApiBodyValidationError = ({
  message = 'Body validation error',
  key = VALIDATION_ERRORS.BODY_VALIDATION_ERROR,
  validationError,
} = {}) => new AppError({
  message,
  key,
  status: 409,
  validation: {
    context: 'body',
    details: validationError?.details || [],
  },
});

export const ApiParamsValidationError = ({
  message = 'Params validation error',
  key = VALIDATION_ERRORS.PARAMS_VALIDATION_ERROR,
  validationError,
} = {}) => new AppError({
  message,
  key,
  status: 409,
  validation: {
    context: 'params',
    details: validationError?.details || [],
  },
});

export const ApiQueryValidationError = ({
  message = 'Query validation error',
  key = VALIDATION_ERRORS.QUERY_VALIDATION_ERROR,
  validationError,
} = {}) => new AppError({
  message,
  key,
  status: 409,
  validation: {
    context: 'query',
    details: validationError?.details || [],
  },
});

export const ApiConflictError = ({
  message = 'Conflict',
  key = GLOBAL_ERRORS.CONFLICT_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 409,
});

export const ApiNotFoundError = ({
  message = 'Not found',
  key = GLOBAL_ERRORS.NOT_FOUND_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 404,
});

export const ApiNotFoundUrlError = ({
  message = 'Not found url',
  key = GLOBAL_ERRORS.NOT_FOUND_URL_ERROR,
  url,
} = {}) => new AppError({
  message,
  key,
  url,
  status: 404,
});

export const ApiUnauthorizedError = ({
  message = 'Unauthorized',
  key = GLOBAL_ERRORS.UNAUTHORIZED_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 401,
});

export const ApiInvalidCSRFTokenError = ({
  message = 'Invalid CSRF token',
  key = TOKEN_ERRORS.INVALID_CSRF_TOKEN_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 400,
});

export const ApiForbiddenError = ({
  message = 'Forbidden',
  key = GLOBAL_ERRORS.FORBIDDEN_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 403,
});

export const ApiPermissionRequiredError = ({
  missingPermissions = [],
  message = 'Permission required',
  key = PERMISSION_ERRORS.PERMISSION_REQUIRED_ERROR,
} = {}) => new AppError({
  message,
  key,
  missingPermissions,
  status: 403,
});

export const ApiPermissionNotExistError = ({
  permissions,
  message = 'Permission not exist',
  key = PERMISSION_ERRORS.PERMISSION_NOT_EXIST_ERROR,
} = {}) => new AppError({
  message,
  key,
  permissions,
  status: 403,
});

export const ApiBadRequestError = ({
  message = 'Bad request',
  key = GLOBAL_ERRORS.BAD_REQUEST_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 400,
});

export const ApiInternalServerError = ({
  message = 'Something went wrong',
  key = GLOBAL_ERRORS.INTERNAL_SERVER_ERROR,
} = {}) => new AppError({
  message,
  key,
  status: 500,
});
