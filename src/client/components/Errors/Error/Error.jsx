import {
  memo, useState, useMemo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useThemeContext } from '@client/contexts/ThemeContext';
import { valuesConstants } from '@shared/constants';
import imageDark from '@client/assets/images/undraw_fixing_bugs_dark_w7gi.svg';
import imageLight from '@client/assets/images/undraw_fixing_bugs_light_w7gi.svg';
import LazyImage from '@client/components/Images/LazyImage';
import Box from '@client/components/Box';
import Text from '@client/components/Typography/Text';
import Button from '@client/components/Buttons/Button';

const PATH = 'common.errors';

const Error = memo((props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { theme } = useThemeContext();

  const image = useMemo(() => (
    theme === valuesConstants.THEME.DARK ? imageDark : imageLight
  ), [theme]);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    window.location.reload(true);
  }, []);

  return (
    <Box
      className="error m-auto"
      {...props}
    >
      <LazyImage
        src={image}
        alt={t(`${PATH}.ERROR_ON_THE_PAGE`)}
        divClassName="mb-4 px-2"
        imgClassName="img-fluid"
        height={283}
        width={400}
      />
      <Text
        as="strong"
        className="d-block mb-3"
      >
        <Box>
          {t(`${PATH}.UNEXPECTED_ERROR_OCCURRED`)}
        </Box>
      </Text>
      <Button
        title={t(`${PATH}.REFRESH_PAGE`)}
        disabled={isLoading}
        rounded
        onClick={handleClick}
      >
        {t(`${PATH}.TRY_REFRESH_PAGE`)}
        {isLoading && (
          <Box
            as="span"
            className="ms-1"
          >
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              fixedWidth
            />
          </Box>
        )}
      </Button>
    </Box>
  );
});

Error.displayName = 'Error';

export default Error;
