import { memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { portalPropTypes, portalDefaultProps } from '@client/prop-types';

const Portal = memo(({ to, children }) => {
  const target = useMemo(() => {
    if (!to.startsWith('#')) return to;

    return to.substr(1);
  }, [to]);

  return createPortal(children, document.getElementById(target));
});

Portal.displayName = 'Portal';

Portal.propTypes = portalPropTypes;

Portal.defaultProps = portalDefaultProps;

export default Portal;
