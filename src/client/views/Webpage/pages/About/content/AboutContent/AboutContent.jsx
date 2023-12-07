import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAbout } from '@client/store/about';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { useWebpageLayerContext } from '@client/views/Webpage/contexts/WebpageLayerContext';
import { sanitize } from '@client/utils/sanitizeUtils';
import { toastsConstants } from '@shared/constants';
import PageContainer from '@client/layouts/PageContainer';
import Spinner from '@client/components/Spinner';
import Box from '@client/components/Box';
import Markdown from '@client/components/Markdown';

const AboutContent = memo(() => {
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();
  const { hideWebpageLayer } = useWebpageLayerContext();

  const {
    about,
    actions: { getAbout, cancelGetAbout },
    utils: { getAboutMetadata, resetGetAboutMetadata },
  } = useAbout();

  const contents = useMemo(() => {
    if (about?.html_contents) {
      return sanitize(about?.html_contents);
    }

    return about?.html_contents;
  }, [about]);

  useEffect(() => {
    if (getAboutMetadata.isError) {
      addToast({
        message: getAboutMetadata.error,
        type: toastsConstants.TYPE.DANGER,
      });
    }
  }, [getAboutMetadata.isError]);

  useEffect(() => {
    if (getAboutMetadata.isFinished) {
      hideWebpageLayer();
    }
  }, [getAboutMetadata.isFinished]);

  useEffect(async () => {
    await getAbout();
  }, []);

  useEffect(() => () => {
    cancelGetAbout();
    resetGetAboutMetadata();
  }, []);

  return (
    <PageContainer>
      {getAboutMetadata.isLoading ? (
        <Box className="position-component-center">
          <Spinner />
        </Box>
      ) : (
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
      )}
    </PageContainer>
  );
});

AboutContent.displayName = 'AboutContent';

export default AboutContent;
