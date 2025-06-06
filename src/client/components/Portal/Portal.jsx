import {
  useState, useMemo, useRef, useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import uniqueId from 'lodash/uniqueId';
import { portalPropTypes } from '@client/prop-types/portalPropTypes';

const Portal = ({ to, prepend, children }) => {
  const [isCreated, setIsCreated] = useState(false);
  const id = useRef(uniqueId());

  const targetId = useMemo(() => {
    if (!to.startsWith('#')) return `${to}-${id.current}`;

    return `${to.substr(1)}-${id.current}`;
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
  }, [targetId, prepend]);

  const targetElement = document.getElementById(targetId);

  return isCreated && targetElement ? createPortal(children, targetElement) : null;
};

Portal.displayName = 'Portal';

Portal.propTypes = portalPropTypes.props;

Portal.defaultProps = portalPropTypes.default;

export default Portal;
