import { shape, instanceOf } from 'prop-types';

export const refPropTypes = {
  props: shape({ current: instanceOf(Element) }),
  default: {},
};
