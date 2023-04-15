import { oneOf } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const headingPropTypes = {
  children: childrenPropTypes,
  as: oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

export const headingDefaultProps = {
  children: childrenDefaultProps,
  as: 'h1',
};
