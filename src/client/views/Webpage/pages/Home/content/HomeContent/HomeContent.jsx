import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import WelcomeBanner from '@client/views/Webpage/pages/Home/components/WelcomeBanner';
import PageContainer from '@client/layouts/PageContainer';

const PATH = 'common';

const Home = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <WelcomeBanner />
      <PageContainer>
        <div className="home position-relative">
          <div className="position-component-center mt-0">
            {t(`${PATH}.NO_CONTENT`)}
          </div>
        </div>
      </PageContainer>
    </>
  );
});

Home.displayName = 'Home';

export default Home;
