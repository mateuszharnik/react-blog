import {
  memo, useEffect, useCallback, useState,
} from 'react';
import { useConfig } from '@client/store/config';
import { useContact } from '@client/store/contact';
import { useTokens } from '@client/store/tokens';
import { useCSRF } from '@client/store/csrf';
import { Routes } from '@client/router';

const AppContent = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  const { actions: { getConfig } } = useConfig();
  const { actions: { getContact } } = useContact();
  const { actions: { getRefreshToken } } = useTokens();
  const { actions: { getCSRFToken } } = useCSRF();

  const fetchInitialData = useCallback(async () => {
    try {
      await getCSRFToken({ shouldUpdateMetadata: false });
      await getRefreshToken({ shouldUpdateMetadata: false });
      await getConfig({ shouldUpdateMetadata: false });
      await getContact({ shouldUpdateMetadata: false });
    } finally {
      setIsLoading(false);
    }
  }, [getCSRFToken, getRefreshToken, getConfig, getContact]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  return isLoading ? null : <Routes />;
});

AppContent.displayName = 'AppContent';

export default AppContent;
