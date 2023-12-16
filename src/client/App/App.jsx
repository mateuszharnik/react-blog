import { memo } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { isDevtoolsEnabled } from '@client/utils/envUtils';
import ThemeContext from '@client/contexts/ThemeContext';
import LayerContext from '@client/contexts/LayerContext';
import PageSizeContext from '@client/contexts/PageSizeContext';
import LanguageContext from '@client/contexts/LanguageContext';
import ToastsContext from '@client/contexts/ToastsContext';
import ConnectionStatus from '@client/components/Errors/ConnectionStatus';
import Heading from '@client/components/Typography/Heading';
import ErrorBoundary from '@client/components/Errors/ErrorBoundary';
import AppContent from '@client/App/content/AppContent';

const PATH = 'head';

const App = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t(`${PATH}.TITLE`),
    description: t(`${PATH}.DESCRIPTION`),
    keywords: t(`${PATH}.KEYWORDS`),
    imageAlt: t(`${PATH}.IMAGE_ALT`),
    siteName: t(`${PATH}.SITE_NAME`),
  });

  return (
    <>
      <ThemeContext>
        <LayerContext>
          <LanguageContext>
            <PageSizeContext>
              <ToastsContext>
                <Heading className="visually-hidden">
                  {t(`${PATH}.TITLE`)}
                </Heading>
                <ErrorBoundary>
                  <AppContent />
                  <ConnectionStatus />
                </ErrorBoundary>
              </ToastsContext>
            </PageSizeContext>
          </LanguageContext>
        </LayerContext>
      </ThemeContext>
      {isDevtoolsEnabled && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
});

App.displayName = 'App';

export default App;
