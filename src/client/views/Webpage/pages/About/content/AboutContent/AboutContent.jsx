import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAbout } from '@client/store/about';
import { useToastsContext } from '@client/context/ToastsContext';
import { useWebpageLayerContext } from '@client/views/Webpage/context/WebpageLayerContext';
import { sanitize } from '@client/utils/sanitizeUtils';
import { toastsConstants } from '@shared/constants';
import PageContainer from '@client/layouts/PageContainer';
import Spinner from '@client/components/Spinner';

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
        <div className="position-component-center">
          <Spinner />
        </div>
      ) : (
        <div className="py-4">
          {about?.html_contents ? (
            <div
              className="markdown mt-2"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: contents }}
            />
          ) : (
            <div className="position-component-center">
              {t('common.NO_CONTENT')}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
});

AboutContent.displayName = 'AboutContent';

export default AboutContent;
