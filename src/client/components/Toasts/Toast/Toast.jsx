import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToastsContext } from '@client/context/ToastsContext';
import { getToastIcon } from '@client/utils/iconsUtils';
import { toastPropTypes } from '@client/prop-types';

const PATH = 'common.toasts';

const Toast = memo(({ marginBottom, toast }) => {
  const { t } = useTranslation();
  const { actions: { removeToast } } = useToastsContext();

  const divClassName = useMemo(() => (!toast.title ? 'toast-body__wrapper' : null), [toast]);

  const toastClassName = useMemo(() => `toast toast-${toast.type} ${marginBottom ? 'mt-2' : 'mb-2'}`, [toast, marginBottom]);

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
    let timeout = null;

    if (toast.autoClose) {
      timeout = setTimeout(() => {
        removeToast(toast.id);
      }, toast.delay);
    }

    return () => {
      if (toast.autoClose) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div
      className={toastClassName}
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
            {toast.title}
          </strong>
          <button
            type="button"
            title={t(`${PATH}.CLOSE_NOTIFICATION`)}
            className="btn-close ms-auto"
            aria-label={t(`${PATH}.CLOSE`)}
            onClick={handleRemove}
          />
        </div>
      )}
      <div className={divClassName}>
        <div className="toast-body">
          {toast.message}
        </div>
        {!toast.title && (
          <button
            type="button"
            title={t(`${PATH}.CLOSE_NOTIFICATION`)}
            className="btn-close me-2 m-auto"
            aria-label={t(`${PATH}.CLOSE`)}
            onClick={handleRemove}
          />
        )}
      </div>
      {toast.progressBar && toast.autoClose && (
        <div className="toast-progress__wrapper px-1 pb-1">
          <div className="toast-progress">
            <div
              className="toast-progress__bar"
              style={{ animationDuration: `${toast.delay}ms` }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

Toast.propTypes = toastPropTypes;

export default Toast;
