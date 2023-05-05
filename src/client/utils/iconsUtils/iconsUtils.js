import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { toastsConstants } from '@shared/constants';

export const getToastIcon = (type = '') => {
  let result = '';

  switch (type) {
    case toastsConstants.TYPE.WARNING:
      result = faExclamationTriangle;
      break;
    case toastsConstants.TYPE.DANGER:
      result = faExclamationCircle;
      break;
    case toastsConstants.TYPE.INFO:
      result = faInfoCircle;
      break;
    case toastsConstants.TYPE.SUCCESS:
      result = faCheckCircle;
      break;
    default:
      result = '';
      break;
  }

  return result;
};
