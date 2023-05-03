import { memo, forwardRef, useMemo } from 'react';
import { hamburgerPropTypes, hamburgerDefaultProps } from '@client/prop-types';

const Hamburger = memo(
  forwardRef(({
    onBlur, onClick, title, hamburgerClassName, attr, isExpanded, text,
  }, buttonRef) => {
    const buttonClassName = useMemo(
      () => `hamburger p-1 ${hamburgerClassName}`.trim(),
      [hamburgerClassName],
    );

    return (
      <button
        aria-controls="nav"
        aria-label={title}
        aria-expanded={isExpanded}
        ref={buttonRef}
        data-nav={attr || null}
        type="button"
        title={title}
        className={buttonClassName}
        onBlur={onBlur}
        onClick={onClick}
      >
        <span className="visually-hidden">
          {text}
        </span>
        <div className="hamburger__bar" />
      </button>
    );
  }),
);

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = hamburgerPropTypes;

Hamburger.defaultProps = hamburgerDefaultProps;

export default Hamburger;
