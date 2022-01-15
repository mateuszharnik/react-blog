import React, { memo, forwardRef, useMemo } from 'react';
import { func, string, bool } from 'prop-types';

const Hamburger = memo(
  forwardRef(({
    handleBlur, handleClick, title, classList, attr,
  }, ref) => {
    const className = useMemo(() => `hamburger p-1 ${classList}`.trim());

    return (
      <button
        aria-controls="nav"
        aria-label={title}
        ref={ref}
        data-nav={attr || null}
        type="button"
        title={title}
        className={className}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        <span className="visually-hidden">Menu</span>
        <div className="hamburger__bar" />
      </button>
    );
  }),
);

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = {
  title: string.isRequired,
  handleClick: func.isRequired,
  handleBlur: func,
  classList: string,
  attr: bool,
};

Hamburger.defaultProps = {
  handleBlur: () => {},
  classList: '',
  attr: false,
};

export default Hamburger;
