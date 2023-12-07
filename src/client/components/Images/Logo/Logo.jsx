import { memo, useMemo, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { logoPropTypes } from '@client/prop-types/logoPropTypes';
import { testsConstants } from '@shared/constants';
import logoLight from '@client/assets/images/logo-light.svg';
import logoDark from '@client/assets/images/logo-dark.svg';

const PATH = 'navigation';

const Logo = memo(forwardRef(({
  width,
  height,
  dark,
  ...restProps
}, logoRef) => {
  const { t } = useTranslation();

  const logo = useMemo(() => (dark ? logoDark : logoLight));

  return (
    <img
      ref={logoRef}
      data-testid={testsConstants.PAGE_LOGO}
      src={logo}
      width={width}
      height={height}
      alt={t(`${PATH}.PAGE_LOGO`)}
      className="logo"
      {...restProps}
    />
  );
}));

Logo.displayName = 'Logo';

Logo.propTypes = logoPropTypes.props;

Logo.defaultProps = logoPropTypes.default;

export default Logo;
