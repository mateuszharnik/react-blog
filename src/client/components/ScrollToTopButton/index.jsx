import React, {
  memo, useState, useEffect, useCallback,
} from 'react';
import {
  oneOfType, func, instanceOf, shape,
} from 'prop-types';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

const ScrollToTopButton = memo(({ target }) => {
  const [isVisible, setIsVisible] = useState(window.pageYOffset >= 800);

  const handleScroll = async (e) => {
    e.preventDefault();

    if (!target?.current) return;

    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(target?.current, { a11y: true, duration: 1000 });
    } catch (error) {
      return null;
    }
  };

  const toggleIsVisible = useCallback(() => {
    setIsVisible(window.pageYOffset >= 800);
  }, []);

  useEffect(() => {
    const throttledToggleIsVisible = throttle(toggleIsVisible, 100);
    const debouncedToggleIsVisible = debounce(toggleIsVisible, 100);

    window.addEventListener('scroll', throttledToggleIsVisible);
    window.addEventListener('scroll', debouncedToggleIsVisible);

    return () => {
      window.removeEventListener('scroll', throttledToggleIsVisible);
      window.removeEventListener('scroll', debouncedToggleIsVisible);
    };
  }, [toggleIsVisible]);

  return createPortal(
    <TransitionGroup component={null}>
      <CSSTransition
        appear
        key={isVisible}
        classNames="fade"
        timeout={500}
      >
        <>
          {isVisible && (
            <a
              href="#tresc"
              title="Przewiń do góry"
              className="btn btn-primary scroll-top-button"
              onClick={handleScroll}
            >
              <span className="visually-hidden">Do góry</span>
              <FontAwesomeIcon icon={faChevronUp} />
            </a>
          )}
        </>
      </CSSTransition>
    </TransitionGroup>,
    document.getElementById('scroll-button'),
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

ScrollToTopButton.propTypes = {
  target: oneOfType([func, shape({ current: instanceOf(Object) })]).isRequired,
};

export default ScrollToTopButton;
