import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { logoPropTypes, logoDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';
import logoLight from '@client/assets/images/logo-light.svg';
import logoDark from '@client/assets/images/logo-dark.svg';

const PATH = 'navigation';

const Logo = memo(({ width, height, dark }) => {
  const { t } = useTranslation();

  const logo = useMemo(() => (dark ? logoDark : logoLight));

  return (
    <img
      data-testid={testsConstants.PAGE_LOGO}
      src={logo}
      width={width}
      height={height}
      alt={t(`${PATH}.PAGE_LOGO`)}
      className="logo"
    />
  );
});

Logo.displayName = 'Logo';

Logo.propTypes = logoPropTypes;

Logo.defaultProps = logoDefaultProps;

export default Logo;
