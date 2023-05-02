import { oneOf } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

const HEADINGS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
};

const headingsArray = Object.values(HEADINGS);

export const headingPropTypes = {
  children: childrenPropTypes,
  as: oneOf(headingsArray),
};

export const headingDefaultProps = {
  children: childrenDefaultProps,
  as: HEADINGS.H1,
};
