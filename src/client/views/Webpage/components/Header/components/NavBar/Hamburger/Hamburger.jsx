import { memo, forwardRef, useMemo } from 'react';
import { hamburgerPropTypes } from '@client/prop-types/hamburgerPropTypes';
import Box from '@client/components/Box';
import { getButtonClassName } from './Hamburger.classes';

const Hamburger = memo(
  forwardRef(({
    onBlur, onClick, title, className, attr, isExpanded, text,
  }, buttonRef) => {
    const buttonClassName = useMemo(() => getButtonClassName({ className }), [className]);

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
        <Box
          as="span"
          className="visually-hidden"
        >
          {text}
        </Box>
        <Box className="hamburger__bar" />
      </button>
    );
  }),
);

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = hamburgerPropTypes.props;

Hamburger.defaultProps = hamburgerPropTypes.default;

export default Hamburger;
