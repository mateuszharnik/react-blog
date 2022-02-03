import React, { memo, forwardRef, useMemo } from 'react';
import { func, string, bool } from 'prop-types';

const Hamburger = memo(
  forwardRef(({
    onBlur, onClick, title, className, attr, isExpanded, text,
  }, ref) => {
    const classNames = useMemo(() => `hamburger p-1 ${className}`.trim(), [className]);

    return (
      <button
        aria-controls="nav"
        aria-label={title}
        aria-expanded={isExpanded}
        ref={ref}
        data-nav={attr || null}
        type="button"
        title={title}
        className={classNames}
        onBlur={onBlur}
        onClick={onClick}
      >
        <span className="visually-hidden">{text}</span>
        <div className="hamburger__bar" />
      </button>
    );
  }),
);

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = {
  title: string.isRequired,
  onClick: func.isRequired,
  isExpanded: bool.isRequired,
  text: string,
  onBlur: func,
  className: string,
  attr: bool,
};

Hamburger.defaultProps = {
  onBlur: () => { },
  text: 'Menu',
  className: '',
  attr: false,
};

export default Hamburger;
