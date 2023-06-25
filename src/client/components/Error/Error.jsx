import {
  memo, useState, useMemo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useThemeContext } from '@client/context/ThemeContext';
import { valuesConstants } from '@shared/constants';
import imageDark from '@client/assets/images/undraw_fixing_bugs_dark_w7gi.svg';
import imageLight from '@client/assets/images/undraw_fixing_bugs_light_w7gi.svg';
import LazyImage from '@client/components/LazyImage';

const PATH = 'common.errors';

const Error = memo(() => {
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
    <div className="error m-auto">
      <LazyImage
        src={image}
        alt={t(`${PATH}.ERROR_ON_THE_PAGE`)}
        divClassName="mb-4 px-2"
        imgClassName="img-fluid"
        height={283}
        width={400}
      />
      <strong className="d-block mb-3">
        <div>
          {t(`${PATH}.UNEXPECTED_ERROR_OCCURRED`)}
        </div>
      </strong>
      <button
        type="button"
        className="btn btn-outline-primary rounded-pill"
        title={t(`${PATH}.REFRESH_PAGE`)}
        disabled={isLoading}
        onClick={handleClick}
      >
        {t(`${PATH}.TRY_REFRESH_PAGE`)}
        {isLoading && (
          <span className="ms-1">
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              fixedWidth
            />
          </span>
        )}
      </button>
    </div>
  );
});

Error.displayName = 'Error';

export default Error;
