import get from 'lodash/get';
import omit from 'lodash/omit';
import { errorsConstants } from '@shared/constants';

const { GLOBAL_ERRORS } = errorsConstants;

export class AppError extends Error {
  constructor(error = {}) {
    super(get(error, 'message', 'Something went wrong'));

    this.errorMessage = get(error, 'message', 'Something went wrong');
    this.status = get(error, 'status', 500);
    this.key = get(error, 'key', GLOBAL_ERRORS.INTERNAL_SERVER_ERROR);

    Object.assign(this, omit(error, ['message', 'status', 'key']));
  }
}
