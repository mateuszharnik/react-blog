import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import {
  oneOfType, func, instanceOf, shape,
} from 'prop-types';

const SkipNavLink = memo(({ target }) => {
  const handleScroll = async (e) => {
    e.preventDefault();

    if (!target?.current) return;

    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(target?.current, { a11y: true, duration: 0 });
    } catch (error) {
      return null;
    }
  };

  return createPortal(
    <a
      href="#tresc"
      className="skip-nav-link px-3 py-2"
      title="Przejdź do głównej treści"
      onClick={handleScroll}
    >
      Pomiń nawigację
    </a>,
    document.getElementById('skip-nav'),
  );
});

SkipNavLink.displayName = 'SkipNavLink';

SkipNavLink.propTypes = {
  target: oneOfType([func, shape({ current: instanceOf(Object) })]).isRequired,
};

export default SkipNavLink;
