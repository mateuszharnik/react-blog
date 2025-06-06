import { useEffect, useState } from 'react';
import { useConfig } from '@client/store/config';
import { useDocs } from '@client/store/docs';
import { envConfig } from '@client/configs/envConfig';
import { apiConstants } from '@shared/constants';
import Docs from '@client/views/Docs';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const apiDocsUrl = `${envConfig.CLIENT_URL}${apiConstants.DOCS.ROOT}`;

const DocsRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    hasAccess,
    actions: { getRefreshToken },
    utils: { getRefreshTokenMetadata },
  } = useDocs();
  const { config } = useConfig();

  useEffect(() => {
    if (!config?.use_docs_password) {
      document.location.href = apiDocsUrl;
    } else {
      getRefreshToken();
    }
  }, []);

  useEffect(() => {
    if (getRefreshTokenMetadata.isSuccess) {
      if (hasAccess) {
        document.location.href = apiDocsUrl;
      } else {
        setIsLoading(false);
      }
    }
  }, [hasAccess, getRefreshTokenMetadata.isSuccess]);

  useEffect(() => {
    if (getRefreshTokenMetadata.isError) {
      setIsLoading(false);
    }
  }, [getRefreshTokenMetadata.isError]);

  return isLoading ? <LazyComponentSpinner /> : <Docs />;
};

DocsRoute.displayName = 'DocsRoute';

export default DocsRoute;
