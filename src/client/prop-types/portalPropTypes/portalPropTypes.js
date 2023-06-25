import { string } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const portalPropTypes = {
  children: childrenPropTypes,
  to: string.isRequired,
};

export const portalDefaultProps = {
  children: childrenDefaultProps,
};
