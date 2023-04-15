import { toastsConstants } from '@shared/constants';

const { TYPE } = toastsConstants;

export const defaultToast = {
  title: '',
  message: '',
  delay: 3000,
  autoClose: true,
  progressBar: true,
  type: TYPE.PRIMARY,
  icon: '',
};
