import { string } from 'prop-types';
import { routesConstants } from '@shared/constants';

const { ROOT } = routesConstants;

export const redirectPropTypes = {
  props: {
    to: string,
  },
  default: {
    to: ROOT,
  },
};
