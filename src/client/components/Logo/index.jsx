import React, { memo } from 'react';
import logo from '@client/assets/images/logo-light.svg';
import { number } from 'prop-types';

const Logo = memo(({ width, height }) => (
  <img src={logo} width={width} height={height} alt="Logo strony" className="logo" />
));

Logo.displayName = 'Logo';

Logo.propTypes = {
  width: number,
  height: number,
};

Logo.defaultProps = {
  width: 54,
  height: 30,
};

export default Logo;
