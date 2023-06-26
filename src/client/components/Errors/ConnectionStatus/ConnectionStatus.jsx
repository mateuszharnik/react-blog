import {
  memo, useState, useEffect, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons/faWifi';
import Portal from '@client/components/Portal';
import Box from '@client/components/Box';

const PATH = 'common.connectionStatus';

const ConnectionStatus = memo(() => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const { t } = useTranslation();

  const setOffline = useCallback(() => {
    setIsOffline(true);
  }, []);

  const setOnline = useCallback(() => {
    setIsOffline(false);
  }, []);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return (
    <Portal to="connection-status">
      <TransitionGroup component={null}>
        <CSSTransition
          appear
          key={isOffline}
          classNames="fade"
          timeout={500}
        >
          <>
            {isOffline && (
              <Box className="connection-status px-3 py-2">
                <FontAwesomeIcon icon={faWifi} />
                <Box
                  as="span"
                  className="ms-2"
                >
                  {t(`${PATH}.NO_CONNECTION`)}
                </Box>
              </Box>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </Portal>
  );
});

ConnectionStatus.displayName = 'ConnectionStatus';

export default ConnectionStatus;
