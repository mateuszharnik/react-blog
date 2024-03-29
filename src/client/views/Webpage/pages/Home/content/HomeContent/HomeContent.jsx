import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import WelcomeBanner from '@client/views/Webpage/pages/Home/components/WelcomeBanner';
import PageContainer from '@client/layouts/PageContainer';
import Box from '@client/components/Box';

const PATH = 'common';

const Home = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <WelcomeBanner />
      <PageContainer>
        <Box className="home position-relative">
          <Box className="position-component-center mt-0">
            {t(`${PATH}.NO_CONTENT`)}
          </Box>
        </Box>
      </PageContainer>
    </>
  );
});

Home.displayName = 'Home';

export default Home;
