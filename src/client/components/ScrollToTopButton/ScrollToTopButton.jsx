import {
  memo, useState, useEffect, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { refPropTypes, refDefaultProps } from '@client/prop-types';
import Portal from '@client/components/Portal';

const PATH = 'common.scrollToTopButton';

const ScrollToTopButton = memo(({ target }) => {
  const [isVisible, setIsVisible] = useState(window.pageYOffset >= 800);

  const { t } = useTranslation();

  const toggleIsVisible = useCallback(() => {
    setIsVisible(window.pageYOffset >= 800);
  }, []);

  const handleScroll = useCallback(async (e) => {
    e.preventDefault();

    if (!target?.current) return;

    try {
      const jump = (await import(/* webpackChunkName: 'jump' */ 'jump.js')).default;

      jump(target?.current, { a11y: true, duration: 1000 });
    } catch (error) {
      return null;
    }
  }, [target]);

  useEffect(() => {
    const throttledToggleIsVisible = throttle(toggleIsVisible, 100);
    const debouncedToggleIsVisible = debounce(toggleIsVisible, 100);

    window.addEventListener('scroll', throttledToggleIsVisible);
    window.addEventListener('scroll', debouncedToggleIsVisible);

    return () => {
      window.removeEventListener('scroll', throttledToggleIsVisible);
      window.removeEventListener('scroll', debouncedToggleIsVisible);
    };
  }, []);

  return (
    <Portal to="scroll-button">
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
                href="#main"
                title={t(`${PATH}.SCROLL_TO_TOP`)}
                className="btn btn-primary scroll-top-button"
                onClick={handleScroll}
              >
                <span className="visually-hidden">
                  {t(`${PATH}.TO_TOP`)}
                </span>
                <FontAwesomeIcon icon={faChevronUp} />
              </a>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </Portal>
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

ScrollToTopButton.propTypes = {
  target: refPropTypes,
};

ScrollToTopButton.defaultProps = {
  target: refDefaultProps,
};

export default ScrollToTopButton;
