import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import getToastIcon from './index';

describe('getToastIcon', () => {
  it('should return correct icons', () => {
    expect(getToastIcon('warning')).toEqual(faExclamationTriangle);
    expect(getToastIcon('danger')).toEqual(faExclamationCircle);
    expect(getToastIcon('info')).toEqual(faInfoCircle);
    expect(getToastIcon('success')).toEqual(faCheckCircle);
  });

  it('should return empty string if user pass incorrect value', () => {
    expect(getToastIcon('example')).toEqual('');
    expect(getToastIcon('')).toEqual('');
    expect(getToastIcon(1)).toEqual('');
    expect(getToastIcon(0)).toEqual('');
    expect(getToastIcon(NaN)).toEqual('');
    expect(getToastIcon(null)).toEqual('');
    expect(getToastIcon(undefined)).toEqual('');
    expect(getToastIcon([])).toEqual('');
    expect(getToastIcon({})).toEqual('');
  });
});
