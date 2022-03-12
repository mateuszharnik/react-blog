import React, { memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { shape, instanceOf } from 'prop-types';

const SkipNavLink = memo(({ target }) => {
  const handleScroll = useCallback(async (e) => {
    e.preventDefault();

    if (!target?.current) return;

    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(target?.current, { a11y: true, duration: 0 });
    } catch (error) {
      return null;
    }
  }, [target]);

  return createPortal(
    <div className="react-portal-target">
      <a
        href="#tresc"
        className="skip-nav-link px-3 py-2"
        title="Przejdź do głównej treści"
        onClick={handleScroll}
      >
        Pomiń nawigację
      </a>
    </div>,
    document.getElementById('skip-nav'),
  );
});

SkipNavLink.displayName = 'SkipNavLink';

SkipNavLink.propTypes = {
  target: shape({ current: instanceOf(Element) }),
};

SkipNavLink.defaultProps = {
  target: null,
};

export default SkipNavLink;
