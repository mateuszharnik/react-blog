import { memo, useMemo } from 'react';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { usePermissions } from '@client/store/user';
import { protectedComponentPropTypes } from '@client/prop-types/protectedComponentPropTypes';

const ProtectedComponent = memo(({
  children,
  paywallComponent,
  accessDeniedComponent,
  shouldBeAuthenticated,
  requiredSubscriptions,
  requiredRoles,
  requiredPermissions,
  requiredCondition,
}) => {
  const {
    isAuthenticated,
    hasPermissions,
    hasSubscriptions,
    hasRoles,
    hasCorrectCondition,
  } = usePermissions({
    requiredPermissions,
    requiredSubscriptions,
    requiredRoles,
    requiredCondition,
  });

  const DynamicComponent = useMemo(() => {
    const result = cond([
      [
        () => isAuthenticated !== shouldBeAuthenticated,
        () => accessDeniedComponent,
      ],
      [
        () => !hasCorrectCondition,
        () => accessDeniedComponent,
      ],
      [
        () => !hasPermissions,
        () => accessDeniedComponent,
      ],
      [
        () => !hasRoles,
        () => accessDeniedComponent,
      ],
      [
        () => !hasSubscriptions,
        () => paywallComponent,
      ],
      [
        stubTrue,
        () => () => children,
      ],
    ]);

    return result();
  }, [
    hasCorrectCondition,
    hasPermissions,
    hasRoles,
    hasSubscriptions,
    isAuthenticated,
    shouldBeAuthenticated,
    accessDeniedComponent,
    paywallComponent,
  ]);

  return DynamicComponent ? <DynamicComponent /> : null;
});

ProtectedComponent.displayName = 'ProtectedComponent';

ProtectedComponent.propTypes = protectedComponentPropTypes.props;

ProtectedComponent.defaultProps = protectedComponentPropTypes.default;

export default ProtectedComponent;
