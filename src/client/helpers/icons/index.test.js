import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import getToastIcon from './index';

describe('getToastIcon', () => {
  it('should return correct icons', () => {
    expect(getToastIcon('warning')).toStrictEqual(faExclamationTriangle);
    expect(getToastIcon('danger')).toStrictEqual(faExclamationCircle);
    expect(getToastIcon('info')).toStrictEqual(faInfoCircle);
    expect(getToastIcon('success')).toStrictEqual(faCheckCircle);
  });

  it('should return empty string if user pass incorrect value', () => {
    expect(getToastIcon('example')).toStrictEqual('');
    expect(getToastIcon('')).toStrictEqual('');
    expect(getToastIcon(1)).toStrictEqual('');
    expect(getToastIcon(0)).toStrictEqual('');
    expect(getToastIcon(NaN)).toStrictEqual('');
    expect(getToastIcon(null)).toStrictEqual('');
    expect(getToastIcon(undefined)).toStrictEqual('');
    expect(getToastIcon([])).toStrictEqual('');
    expect(getToastIcon({})).toStrictEqual('');
  });
});
