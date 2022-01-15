import React, { memo, useMemo } from 'react';
import { func, string } from 'prop-types';

const Hamburger = memo(({ handleClick, title, classList }) => {
  const className = useMemo(() => `hamburger p-1 ${classList}`.trim());

  return (
    <button type="button" title={title} className={className} onClick={handleClick}>
      <span className="visually-hidden">Menu</span>
      <div className="hamburger__bar" />
    </button>
  );
});

Hamburger.propTypes = {
  title: string.isRequired,
  handleClick: func.isRequired,
  classList: string,
};

Hamburger.defaultProps = {
  classList: '',
};

export default Hamburger;
