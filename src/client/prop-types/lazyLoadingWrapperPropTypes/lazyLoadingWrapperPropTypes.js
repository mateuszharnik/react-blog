import { number, string } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const lazyLoadingWrapperPropTypes = {
  children: childrenPropTypes,
  wrapperClassName: string,
  offsetTop: number,
};

export const lazyLoadingWrapperDefaultProps = {
  children: childrenDefaultProps,
  wrapperClassName: '',
  offsetTop: 0,
};
