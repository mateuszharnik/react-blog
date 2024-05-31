import {
  memo, useState, useEffect, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { refPropTypes } from '@client/prop-types/refPropTypes';
import Link from '@client/router/components/Link';
import Portal from '@client/components/Portal';
import Box from '@client/components/Box';

const PATH = 'common.scrollToTopButton';

const ScrollToTopButton = memo(({ target, ...restProps }) => {
  const [isVisible, setIsVisible] = useState(window.scrollY >= 300);

  const { t } = useTranslation();

  const toggleIsVisible = useCallback(() => {
    setIsVisible(window.scrollY >= 300);
  }, []);

  const handleScroll = useCallback(async (event) => {
    event.preventDefault();

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
              <Link
                to="#main"
                className="btn btn-primary scroll-top-button"
                title={t(`${PATH}.SCROLL_TO_TOP`)}
                {...restProps}
                onClick={handleScroll}
              >
                <Box
                  as="span"
                  className="visually-hidden"
                >
                  {t(`${PATH}.TO_TOP`)}
                </Box>
                <FontAwesomeIcon icon={faChevronUp} />
              </Link>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </Portal>
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

ScrollToTopButton.propTypes = {
  target: refPropTypes.props,
};

ScrollToTopButton.defaultProps = {
  target: refPropTypes.default,
};

export default ScrollToTopButton;
