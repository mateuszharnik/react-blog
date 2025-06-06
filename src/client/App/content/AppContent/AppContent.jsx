import { useEffect, useState } from 'react';
import { useConfig } from '@client/store/config';
import { useContact } from '@client/store/contact';
import { useTokens } from '@client/store/tokens';
import { useCSRF } from '@client/store/csrf';
import { useUser } from '@client/store/user';
import { Routes } from '@client/router';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { actions: { getConfig } } = useConfig();
  const { actions: { getContact } } = useContact();
  const { actions: { getLoggedUser } } = useTokens();
  const { actions: { getCSRFToken } } = useCSRF();
  const { actions: { getMe } } = useUser();

  const fetchInitialData = async () => {
    try {
      await getCSRFToken({ shouldUpdateMetadata: false });
      await getConfig({ shouldUpdateMetadata: false });
      await getContact({ shouldUpdateMetadata: false });

      const { result } = await getLoggedUser({ shouldUpdateMetadata: false });

      if (result) await getMe({ shouldUpdateMetadata: false });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return isLoading ? null : <Routes />;
};

AppContent.displayName = 'AppContent';

export default AppContent;
