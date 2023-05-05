import { string } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const activeLinkPropTypes = {
  to: string.isRequired,
  id: string,
  linkClassName: string,
  children: childrenPropTypes,
};

export const activeLinkDefaultProps = {
  id: '',
  linkClassName: 'link',
  children: childrenDefaultProps,
};
