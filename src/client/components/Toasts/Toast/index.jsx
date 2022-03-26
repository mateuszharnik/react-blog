import React, {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import {
  string, number, bool, shape, oneOfType, object, oneOf,
} from 'prop-types';
import { useStoreActions } from 'easy-peasy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getToastIcon from '@client/helpers/icons';

const Toast = memo(({ marginBottom, toast }) => {
  const { removeToast } = useStoreActions((actions) => actions.toasts);

  const divClass = useMemo(() => (!toast.title ? 'toast-body__wrapper' : null), [toast]);

  const toastClass = useMemo(() => `toast toast-${toast.theme} toast-${toast.theme}-${toast.type} ${marginBottom ? 'mt-2' : 'mb-2'}`, [toast, marginBottom]);

  const icon = useMemo(() => {
    if (!toast.icon) {
      return getToastIcon(toast.type);
    }

    return toast.icon;
  }, [toast]);

  const isFontAwesomeIcon = useMemo(() => {
    if (toast.icon && typeof toast.icon === 'string') {
      return false;
    }

    return true;
  }, [toast]);

  const handleRemove = useCallback(() => {
    removeToast(toast.id);
  }, [toast]);

  useEffect(() => {
    if (toast.autoClose) {
      const timeout = setTimeout(() => {
        removeToast(toast.id);
      }, toast.delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div
      className={toastClass}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {toast.title && (
        <div className="toast-header">
          {icon && (
            <div className="toast-icon me-2">
              {isFontAwesomeIcon ? (
                <FontAwesomeIcon
                  icon={icon}
                />
              ) : (
                <span>
                  {icon}
                </span>
              )}
            </div>
          )}
          <strong className="me-auto">
            { toast.title }{' '}
          </strong>
          <button
            type="button"
            title="Zamknij powiadomienie"
            className="btn-close ms-auto"
            aria-label="Zamknij"
            onClick={handleRemove}
          />
        </div>
      )}
      <div className={divClass}>
        <div className="toast-body">
          { toast.message }
        </div>
        {!toast.title && (
          <button
            type="button"
            title="Zamknij powiadomienie"
            className="btn-close me-2 m-auto"
            aria-label="Zamknij"
            onClick={handleRemove}
          />
        )}
      </div>
      <div className="toast-progress__wrapper px-1 pb-1">
        <div className="toast-progress">
          {toast.progressBar && toast.autoClose && (
            <div
              className="toast-progress__bar"
              style={{ animationDuration: `${toast.delay}ms` }}
            />
          )}
        </div>
      </div>
    </div>
  );
});

Toast.displayName = 'Toast';

Toast.propTypes = {
  marginBottom: bool.isRequired,
  toast: shape({
    id: string.isRequired,
    message: string.isRequired,
    title: string.isRequired,
    delay: number.isRequired,
    autoClose: bool.isRequired,
    progressBar: bool.isRequired,
    theme: string.isRequired,
    type: string.isRequired,
    icon: oneOfType([string, object]).isRequired,
    module: oneOf(['signIn', 'signUp', 'admin', 'webpage', 'docs']).isRequired,
  }).isRequired,
};

export default Toast;
