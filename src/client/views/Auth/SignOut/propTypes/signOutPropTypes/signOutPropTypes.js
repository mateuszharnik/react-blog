import { string } from 'prop-types';
import { routesConstants } from '@shared/constants';

export const signOutPropTypes = {
  props: {
    redirectUrl: string,
  },
  default: {
    redirectUrl: routesConstants.AUTH.SIGN_IN.ROOT,
  },
};
