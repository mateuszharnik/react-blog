import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { errorsConstants } from '@shared/constants';
import { CanceledError } from 'axios';

const {
  GLOBAL_ERRORS: { INTERNAL_SERVER_ERROR },
  PERMISSION_ERRORS: { PERMISSION_REQUIRED_ERROR },
  TOKEN_ERRORS: { INVALID_REFRESH_TOKEN_ERROR },
} = errorsConstants;

const permissionsForRefresh = [
  PERMISSION_REQUIRED_ERROR,
  INVALID_REFRESH_TOKEN_ERROR,
];

export class ApiResponseError extends Error {
  constructor(error = {}) {
    super(get(error, 'response.data.message', 'Something went wrong'));
    this.message = get(error, 'response.data.message', 'Something went wrong');
    this.key = get(error, 'response.data.key', INTERNAL_SERVER_ERROR);
    this.url = get(error, 'response.data.url', null);
    this.shouldCheckForRefresh = permissionsForRefresh.includes(this.key);
    this.isCanceled = error instanceof CanceledError;

    this.#setPermissionsFields(error);
    this.#setValidationFields(error);
  }

  #setPermissionsFields = (error = {}) => {
    const missingPermissions = get(error, 'response.data.missingPermissions', null);

    this.missingPermissions = isArray(missingPermissions) ? missingPermissions : null;

    this.isPermissionError = this.key === PERMISSION_REQUIRED_ERROR;
    this.isRefreshTokenError = this.key === INVALID_REFRESH_TOKEN_ERROR;
  };

  #setValidationFields = (error = {}) => {
    const validationDetails = get(error, 'response.data.validation.details', null);

    this.validationContext = get(error, 'response.data.validation.context', null);

    this.validationDetails = isArray(validationDetails) ? validationDetails : null;

    this.isParamsValidationError = this.validationContext === 'params' || false;
    this.isQueryValidationError = this.validationContext === 'query' || false;
    this.isBodyValidationError = this.validationContext === 'body' || false;

    this.isValidationError = (
      this.isParamsValidationError || this.isQueryValidationError || this.isBodyValidationError
    );
  };
}
