import {
  memo, useState, useMemo, useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import uniqueId from 'lodash/uniqueId';
import { portalPropTypes } from '@client/prop-types/portalPropTypes';

const Portal = memo(({ to, prepend, children }) => {
  const [isCreated, setIsCreated] = useState(false);

  const targetId = useMemo(() => {
    const id = uniqueId();

    if (!to.startsWith('#')) return `${to}-${id}`;

    return `${to.substr(1)}-${id}`;
  }, [to]);

  useEffect(() => {
    const createdElement = document.createElement('div');
    createdElement.id = targetId;

    if (prepend) {
      document.body.prepend(createdElement);
    } else {
      document.body.appendChild(createdElement);
    }

    setIsCreated(true);

    return () => {
      const elementToDelete = document.getElementById(targetId);

      if (document.body.contains(elementToDelete)) {
        document.body.removeChild(elementToDelete);
      }
    };
  }, []);

  return isCreated ? createPortal(children, document.querySelector(`#${targetId}`)) : null;
});

Portal.displayName = 'Portal';

Portal.propTypes = portalPropTypes.props;

Portal.defaultProps = portalPropTypes.default;

export default Portal;
