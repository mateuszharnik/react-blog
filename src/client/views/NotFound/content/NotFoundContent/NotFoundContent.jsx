import {
  memo, useEffect, useState, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@client/router/hooks';
import { useLayerContext } from '@client/context/LayerContext';
import { useThemeContext } from '@client/context/ThemeContext';
import { routesConstants, valuesConstants } from '@shared/constants';
import imageLight from '@client/assets/images/undraw_page_not_found_light_su7k.svg';
import imageDark from '@client/assets/images/undraw_page_not_found_dark_su7k.svg';
import Link from '@client/router/components/Link';
import MaxViewHeight from '@client/components/MaxViewHeight';
import LazyImage from '@client/components/Images/LazyImage';
import Box from '@client/components/Box';

const PATH = 'common.notFound';

const NotFoundContent = memo(() => {
  const [seconds, setSeconds] = useState(10);

  const { t } = useTranslation();
  const { hideLayer } = useLayerContext();
  const { theme } = useThemeContext();
  const { history: { push } } = useRouter();

  const image = useMemo(() => (
    theme === valuesConstants.THEME.DARK ? imageDark : imageLight
  ), [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds <= 0) {
        push(routesConstants.ROOT);
      } else {
        setSeconds((state) => state - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    hideLayer();
  }, []);

  return (
    <MaxViewHeight className="position-relative">
      <Box className="w-100 position-center">
        <Box className="not-found m-auto">
          <LazyImage
            src={image}
            alt={t(`${PATH}.IMAGE_ALT_TEXT`)}
            divClassName="mb-4 px-2"
            imgClassName="img-fluid"
            height={477}
            width={1075}
          />
          <Box>{t(`${PATH}.PAGE_NOT_FOUND`)}</Box>
          <Box>
            {t(`${PATH}.BACK_TO`)}{' '}
            <Link
              to={routesConstants.ROOT}
              title={t(`${PATH}.BACK_TO_HOMEPAGE`)}
            >
              <Box as="span">
                {t(`${PATH}.HOME_PAGE`)}
              </Box>
            </Link>{' '}
            {t(`${PATH}.SECONDS`, { seconds })}
          </Box>
        </Box>
      </Box>
    </MaxViewHeight>
  );
});

NotFoundContent.displayName = 'NotFoundContent';

export default NotFoundContent;
