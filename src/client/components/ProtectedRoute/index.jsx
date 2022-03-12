import { memo } from 'react';
import {
  oneOfType, arrayOf, node, func,
} from 'prop-types';

const ProtectedRoute = memo(({ beforeEnter, children }) => beforeEnter(children));

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.propTypes = {
  beforeEnter: func.isRequired,
  children: oneOfType([arrayOf(node), node]),
};

ProtectedRoute.defaultProps = {
  children: null,
};

export default ProtectedRoute;
