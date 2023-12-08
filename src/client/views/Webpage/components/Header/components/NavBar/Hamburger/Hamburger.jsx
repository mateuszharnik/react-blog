import { memo, forwardRef, useMemo } from 'react';
import { hamburgerPropTypes } from '@client/prop-types/hamburgerPropTypes';
import Box from '@client/components/Box';
import { getButtonClassName } from './Hamburger.classes';

const Hamburger = memo(forwardRef(({
  onBlur,
  onClick,
  title,
  className,
  attr,
  isExpanded,
  text,
  ...restProps
}, buttonRef) => {
  const buttonClassName = useMemo(() => getButtonClassName({ className }), [className]);

  return (
    <button
      ref={buttonRef}
      aria-controls="nav"
      type="button"
      aria-label={title}
      aria-expanded={isExpanded}
      data-nav={`${attr}` || null}
      title={title}
      className={buttonClassName}
      {...restProps}
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
}));

Hamburger.displayName = 'Hamburger';

Hamburger.propTypes = hamburgerPropTypes.props;

Hamburger.defaultProps = hamburgerPropTypes.default;

export default Hamburger;
