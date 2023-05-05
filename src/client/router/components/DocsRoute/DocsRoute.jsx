import { memo, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useConfig } from '@client/store/config';
import { useDocs } from '@client/store/docs';
import { envConfig } from '@client/configs/envConfig';
import { apiConstants } from '@shared/constants';

const apiDocsUrl = `${envConfig.CLIENT_URL}/${apiConstants.DOCS.ROOT}`;

const DocsRoute = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    accessToken,
    actions: { getRefreshToken },
    utils: { getRefreshTokenMetadata },
  } = useDocs();
  const { config } = useConfig();

  useEffect(async () => {
    if (!config?.use_docs_password) {
      document.location.href = apiDocsUrl;
    } else {
      await getRefreshToken();
    }
  }, []);

  useEffect(() => {
    if (getRefreshTokenMetadata.isSuccess) {
      if (accessToken) {
        document.location.href = apiDocsUrl;
      } else {
        setIsLoading(false);
      }
    }
  }, [accessToken, getRefreshTokenMetadata.isSuccess]);

  useEffect(() => {
    if (getRefreshTokenMetadata.isError) {
      setIsLoading(false);
    }
  }, [getRefreshTokenMetadata.isError]);

  return isLoading ? null : <Outlet />;
});

DocsRoute.displayName = 'DocsRoute';

export default DocsRoute;
