import {
  memo, useMemo, useState, useEffect,
} from 'react';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import { usePermissions } from '@client/store/user';
import { protectedComponentPropTypes } from '@client/prop-types/protectedComponentPropTypes';

const ProtectedComponent = memo(({
  children,
  paywallComponent,
  accessDeniedComponent,
  shouldBeAuthenticated,
  requiredSubscription,
  requiredRoles,
  requiredPermissions,
  requiredCondition,
}) => {
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  const {
    isReady,
    isAuthenticated,
    hasPermissions,
    hasSubscription,
    hasRole,
    hasCorrectCondition,
  } = usePermissions({
    requiredPermissions,
    requiredSubscription,
    requiredRoles,
    requiredCondition,
  });

  const DynamicComponent = useMemo(() => {
    const result = cond([
      [
        () => !hasCorrectCondition && accessDeniedComponent,
        () => accessDeniedComponent,
      ],
      [
        () => !hasPermissions && accessDeniedComponent,
        () => accessDeniedComponent,
      ],
      [
        () => !hasSubscription && paywallComponent,
        () => paywallComponent,
      ],
      [
        stubTrue,
        () => null,
      ],
    ]);

    return result();
  }, [
    hasCorrectCondition,
    hasPermissions,
    hasSubscription,
    accessDeniedComponent,
    paywallComponent,
  ]);

  useEffect(() => {
    if (!isReady) return;

    if (isAuthenticated !== shouldBeAuthenticated) return;

    if (!hasRole && requiredRoles.length) return;

    if (!hasCorrectCondition && !accessDeniedComponent) return;

    if (!hasPermissions && !accessDeniedComponent) return;

    if (!hasSubscription && !paywallComponent) return;

    setShouldRenderComponent(true);
  }, [isReady]);

  return shouldRenderComponent ? (
    <>
      {DynamicComponent ? <DynamicComponent /> : children}
    </>
  ) : null;
});

ProtectedComponent.displayName = 'ProtectedComponent';

ProtectedComponent.propTypes = protectedComponentPropTypes.props;

ProtectedComponent.defaultProps = protectedComponentPropTypes.default;

export default ProtectedComponent;
