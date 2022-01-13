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
      const { default: jump } = await import('jump.js');

      jump(target.current, { a11y: true, duration: 0 });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return createPortal(
    <a
      href="#tresc"
      className="skip-nav-link"
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
  target: oneOfType([func, shape({ current: instanceOf(Element) })]).isRequired,
};

export default SkipNavLink;
