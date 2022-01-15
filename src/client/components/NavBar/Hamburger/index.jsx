import React, { memo, forwardRef, useMemo } from 'react';
import { func, string, bool } from 'prop-types';

const Hamburger = memo(
  forwardRef(({
    onBlur, onClick, title, className, attr,
  }, ref) => {
    const classNames = useMemo(() => `hamburger p-1 ${className}`.trim());

    return (
      <button
        aria-controls="nav"
        aria-label={title}
        ref={ref}
        data-nav={attr || null}
        type="button"
        title={title}
        className={classNames}
        onBlur={onBlur}
        onClick={onClick}
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
  onClick: func.isRequired,
  onBlur: func,
  className: string,
  attr: bool,
};

Hamburger.defaultProps = {
  onBlur: () => {},
  className: '',
  attr: false,
};

export default Hamburger;
