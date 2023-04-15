import { string, number } from 'prop-types';

export const toastsContainerPropTypes = {
  limit: number,
  position: string,
};

export const toastsContainerDefaultProps = {
  limit: 5,
  position: 'bottom-right',
};
