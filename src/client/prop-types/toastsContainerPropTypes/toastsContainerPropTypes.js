import { oneOf, number } from 'prop-types';

const POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

const positionsArray = Object.values(POSITIONS);

export const toastsContainerPropTypes = {
  limit: number,
  position: oneOf(positionsArray),
};

export const toastsContainerDefaultProps = {
  limit: 5,
  position: POSITIONS.BOTTOM_RIGHT,
};
