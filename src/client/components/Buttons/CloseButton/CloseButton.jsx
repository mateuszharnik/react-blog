import { memo, useMemo, forwardRef } from 'react';
import { closeButtonPropTypes } from '@client/prop-types/closeButtonPropTypes';
import { getCloseButtonClassName } from './CloseButton.classes';

const CloseButton = memo(forwardRef(({
  className,
  children,
  ...restProps
}, buttonRef) => {
  const buttonClassName = useMemo(() => getCloseButtonClassName({ className }), [className]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={buttonClassName}
      {...restProps}
    >
      {children}
    </button>
  );
}));

CloseButton.displayName = 'CloseButton';

CloseButton.propTypes = closeButtonPropTypes.props;

CloseButton.defaultProps = closeButtonPropTypes.default;

export default CloseButton;
