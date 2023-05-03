import { string, number } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const maxViewHeightPropTypes = {
  children: childrenPropTypes,
  offsetHeight: number,
  maxViewHeightClassName: string,
};

export const maxViewHeightDefaultProps = {
  children: childrenDefaultProps,
  offsetHeight: 0,
  maxViewHeightClassName: '',
};
