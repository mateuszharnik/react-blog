import { oneOfType, arrayOf, node } from 'prop-types';

export const childrenPropTypes = oneOfType([arrayOf(node), node]);

export const childrenDefaultProps = null;
