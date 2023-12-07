import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { toastsContainerPropTypes } from '@client/prop-types/toastsContainerPropTypes';
import Toast from '@client/components/Toasts/Toast';
import Portal from '@client/components/Portal';
import Box from '@client/components/Box';
import { getDivClassName } from './ToastsContainer.classes';

const ToastsContainer = memo(({ limit, position }) => {
  const {
    toasts,
    utils: { setShowFromBottom, setLimit },
    actions: { removeToasts },
  } = useToastsContext();

  const divClassName = useMemo(() => getDivClassName({ position }), [position]);

  const marginBottom = useMemo(() => !position?.includes('top'), [position]);

  const setHeight = useCallback((element) => {
    element.style.height = `${element.clientHeight}px`;
  }, []);

  const removeHeight = useCallback((element) => {
    setTimeout(() => {
      element.style.height = '0px';
    }, 0);
  }, []);

  useEffect(() => {
    setShowFromBottom(!position?.includes('top'));
  }, [position]);

  useEffect(() => {
    setLimit(limit);
  }, [limit]);

  useEffect(() => () => {
    removeToasts();
  }, []);

  return (
    <Portal to="toast">
      <Box className={divClassName}>
        <TransitionGroup component={null}>
          {toasts.map((toast) => (
            <CSSTransition
              appear
              key={toast.id}
              classNames="toast-fade"
              timeout={450}
              onExit={setHeight}
              onExiting={removeHeight}
              onExited={removeHeight}
            >
              <Box className="position-relative">
                <Toast
                  toast={toast}
                  marginBottom={marginBottom}
                />
              </Box>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Box>
    </Portal>
  );
});

ToastsContainer.displayName = 'ToastsContainer';

ToastsContainer.propTypes = toastsContainerPropTypes.position;

ToastsContainer.defaultProps = toastsContainerPropTypes.default;

export default ToastsContainer;
