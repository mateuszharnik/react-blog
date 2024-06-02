import { memo, useMemo, forwardRef } from 'react';
import { buttonPropTypes } from '@client/prop-types/buttonPropTypes';
import { getButtonClassName } from './Button.classes';

const Button = memo(forwardRef(({
  type,
  variant,
  disabled,
  color,
  className,
  size,
  rounded,
  children,
  ...restProps
}, buttonRef) => {
  const buttonClassName = useMemo(() => getButtonClassName({
    variant,
    color,
    size,
    rounded,
    className,
  }), [variant, color, size, rounded, className]);

  return (
    <button
      ref={buttonRef}
      className={buttonClassName}
      disabled={disabled}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  );
}));

Button.displayName = 'Button';

Button.propTypes = buttonPropTypes.props;

Button.defaultProps = buttonPropTypes.default;

export default Button;
