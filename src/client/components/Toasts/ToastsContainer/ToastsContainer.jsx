import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useToastsContext } from '@client/context/ToastsContext';
import { toastsContainerPropTypes, toastsContainerDefaultProps } from '@client/prop-types';
import Toast from '@client/components/Toasts/Toast';
import Portal from '@client/components/Portal';

const ToastsContainer = memo(({ limit, position }) => {
  const {
    toasts,
    utils: { setShowFromBottom, setLimit },
    actions: { removeToasts },
  } = useToastsContext();

  const divClassName = useMemo(() => `toast-wrapper toast-wrapper__${position}`, [position]);

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
      <div className={divClassName}>
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
              <div className="position-relative">
                <Toast
                  toast={toast}
                  marginBottom={marginBottom}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </Portal>
  );
});

ToastsContainer.displayName = 'ToastsContainer';

ToastsContainer.propTypes = toastsContainerPropTypes;

ToastsContainer.defaultProps = toastsContainerDefaultProps;

export default ToastsContainer;
