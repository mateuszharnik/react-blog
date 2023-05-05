import { shape, instanceOf } from 'prop-types';

export const refPropTypes = shape({ current: instanceOf(Element) });

export const refDefaultProps = null;
