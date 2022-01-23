import React, { memo, useMemo } from 'react';
import logoLight from '@client/assets/images/logo-light.svg';
import logoDark from '@client/assets/images/logo-dark.svg';
import { number, bool } from 'prop-types';

const Logo = memo(({ width, height, dark }) => {
  const logo = useMemo(() => (dark ? logoDark : logoLight));

  return (
    <img
      src={logo}
      width={width}
      height={height}
      alt="Logo strony"
      className="logo"
    />
  );
});

Logo.displayName = 'Logo';

Logo.propTypes = {
  width: number,
  height: number,
  dark: bool,
};

Logo.defaultProps = {
  width: 54,
  height: 30,
  dark: false,
};

export default Logo;
