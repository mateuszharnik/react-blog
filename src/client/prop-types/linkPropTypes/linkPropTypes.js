import { string } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const linkPropTypes = {
  to: string.isRequired,
  linkClassName: string,
  children: childrenPropTypes,
};

export const linkDefaultProps = {
  linkClassName: 'link',
  children: childrenDefaultProps,
};
