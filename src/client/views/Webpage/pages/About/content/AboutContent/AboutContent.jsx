import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAbout } from '@client/store/about';
import { useWebpageLayerContext } from '@client/views/Webpage/contexts/WebpageLayerContext';
import { sanitize } from '@client/utils/sanitizeUtils';
import { routesConstants, rolesConstants } from '@shared/constants';
import Link from '@client/router/components/Link';
import ProtectedComponent from '@client/router/components/ProtectedComponent';
import PageContainer from '@client/layouts/PageContainer';
import Spinner from '@client/components/Spinner';
import Box from '@client/components/Box';
import Markdown from '@client/components/Markdown';

const PATH = 'about.aboutPage';

const AboutContent = memo(() => {
  const { t } = useTranslation();
  const { hideWebpageLayer } = useWebpageLayerContext();

  const { about, utils: { getAboutMetadata } } = useAbout();

  const contents = useMemo(() => {
    if (about?.html_contents) {
      return sanitize(about?.html_contents);
    }

    return about?.html_contents;
  }, [about]);

  useEffect(() => {
    if (getAboutMetadata.isFinished) {
      hideWebpageLayer();
    }
  }, [getAboutMetadata.isFinished]);

  return (
    <PageContainer>
      {getAboutMetadata.isLoading ? (
        <Box className="position-component-center">
          <Spinner />
        </Box>
      ) : (
        <>
          <ProtectedComponent requiredRoles={[rolesConstants.ADMIN, rolesConstants.SUPERUSER]}>
            <Box className="text-end my-2">
              <Link
                to={routesConstants.ABOUT.EDIT.ROOT}
                title={t(`${PATH}.GO_TO_EDIT_PAGE`)}
              >
                {t(`${PATH}.EDIT_PAGE`)}
              </Link>
            </Box>
          </ProtectedComponent>
          <Box className="py-4">
            {about?.html_contents ? (
              <Markdown
                className="markdown mt-2"
                html={contents}
              />
            ) : (
              <Box className="position-component-center">
                {t('common.NO_CONTENT')}
              </Box>
            )}
          </Box>
        </>
      )}
    </PageContainer>
  );
});

AboutContent.displayName = 'AboutContent';

export default AboutContent;
