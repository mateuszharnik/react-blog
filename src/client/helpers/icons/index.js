import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

const getToastIcon = (type = '') => {
  let result = '';

  switch (type) {
    case 'warning':
      result = faExclamationTriangle;
      break;
    case 'danger':
      result = faExclamationCircle;
      break;
    case 'info':
      result = faInfoCircle;
      break;
    case 'success':
      result = faCheckCircle;
      break;
    default:
      result = '';
      break;
  }

  return result;
};

export default getToastIcon;
