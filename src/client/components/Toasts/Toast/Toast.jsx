import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getToastIcon } from '@client/utils/iconsUtils';
import { toastPropTypes } from '@client/prop-types/toastPropTypes';
import Box from '@client/components/Box';
import CloseButton from '@client/components/Buttons/CloseButton';
import Text from '@client/components/Typography/Text';
import { getToastClassName } from './Toast.classes';

const PATH = 'common.toasts';

const Toast = ({ marginBottom, toast, removeToast }) => {
  const { t } = useTranslation();

  const divClassName = !toast.title ? 'toast-body__wrapper' : null;

  const toastClassName = getToastClassName({ type: toast.type, marginBottom });

  const icon = !toast.icon ? getToastIcon(toast.type) : toast.icon;

  const isFontAwesomeIcon = !(toast.icon && typeof toast.icon === 'string');

  const handleRemove = () => {
    removeToast(toast.id);
  };

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
    <Box
      className={toastClassName}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {toast.title && (
        <Box className="toast-header">
          {icon && (
            <Box className="toast-icon me-2">
              {isFontAwesomeIcon ? (
                <FontAwesomeIcon
                  icon={icon}
                />
              ) : (
                <Box as="span">
                  {icon}
                </Box>
              )}
            </Box>
          )}
          <Text
            as="strong"
            className="me-auto"
          >
            {toast.title}
          </Text>
          <CloseButton
            title={t(`${PATH}.CLOSE_NOTIFICATION`)}
            className="ms-auto"
            aria-label={t(`${PATH}.CLOSE`)}
            onClick={handleRemove}
          />
        </Box>
      )}
      <Box className={divClassName}>
        <Box className="toast-body">
          {toast.message}
        </Box>
        {!toast.title && (
          <CloseButton
            title={t(`${PATH}.CLOSE_NOTIFICATION`)}
            className="me-2 m-auto"
            aria-label={t(`${PATH}.CLOSE`)}
            onClick={handleRemove}
          />
        )}
      </Box>
      {toast.progressBar && toast.autoClose && (
        <Box className="toast-progress__wrapper px-1 pb-1">
          <Box className="toast-progress">
            <Box
              className="toast-progress__bar"
              style={{ animationDuration: `${toast.delay}ms` }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

Toast.displayName = 'Toast';

Toast.propTypes = toastPropTypes.props;

export default Toast;
