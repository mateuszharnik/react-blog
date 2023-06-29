import { memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { portalPropTypes } from '@client/prop-types/portalPropTypes';

const Portal = memo(({ to, children }) => {
  const target = useMemo(() => {
    if (!to.startsWith('#')) return to;

    return to.substr(1);
  }, [to]);

  return createPortal(children, document.getElementById(target));
});

Portal.displayName = 'Portal';

Portal.propTypes = portalPropTypes.props;

Portal.defaultProps = portalPropTypes.default;

export default Portal;
