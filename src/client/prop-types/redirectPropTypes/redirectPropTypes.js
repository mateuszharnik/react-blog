import { string } from 'prop-types';
import { routesConstants } from '@shared/constants';

const { ROOT } = routesConstants;

export const redirectPropTypes = {
  to: string,
};

export const redirectDefaultProps = {
  to: ROOT,
};
