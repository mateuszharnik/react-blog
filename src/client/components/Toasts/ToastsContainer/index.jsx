import React, {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { string, number } from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Toast from '@client/components/Toasts/Toast';

const ToastsContainer = memo(({ limit, position }) => {
  const { toasts } = useStoreState((state) => state.toasts);
  const { setPosition, setLimit, removeToasts } = useStoreActions((actions) => actions.toasts);

  const divClass = useMemo(() => `toast-wrapper toast-wrapper__${position}`, [position]);

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
    setPosition(!position?.includes('top'));
  }, [position]);

  useEffect(() => {
    setLimit(limit);
  }, [limit]);

  useEffect(() => () => removeToasts(), []);

  return createPortal(
    <div className="react-portal-target">
      <div className={divClass}>
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
    </div>,
    document.getElementById('toast'),
  );
});

ToastsContainer.displayName = 'ToastsContainer';

ToastsContainer.propTypes = {
  limit: number,
  position: string,
};

ToastsContainer.defaultProps = {
  limit: 3,
  position: 'bottom-right',
};

export default ToastsContainer;
