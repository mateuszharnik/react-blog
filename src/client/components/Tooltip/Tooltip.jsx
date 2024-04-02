import { memo, useMemo, useCallback } from 'react';
import isFunction from 'lodash/isFunction';
import { useFloatingPosition } from '@client/hooks/useFloatingPosition';
import { tooltipPropTypes } from '@client/prop-types/tooltipPropTypes';
import Box from '@client/components/Box';

import { getTooltipClassName } from './Tooltip.classes';

const Tooltip = memo(({
  show,
  position,
  className,
  offsetPadding,
  showArrow,
  tooltip,
  shiftPadding,
  maxWidth,
  bordered,
  color,
  onMouseEnter,
  onMouseLeave,
  children,
  ...restProps
}) => {
  const {
    elementRef: tooltipRef,
    wrapperRef,
    arrowRef,
    elementStyles: tooltipStyles,
    arrowStyles,
    isOpen,
    actions: {
      showElement: showTooltip,
      hideElement: hideTooltip,
    },
  } = useFloatingPosition({
    show,
    position,
    offsetPadding,
    shiftPadding,
    maxWidth,
  });

  const tooltipClassName = useMemo(() => getTooltipClassName({
    bordered,
    color,
  }), [bordered, color]);

  const wrapperClassName = useMemo(() => className, [className]);

  const handleMouseEnter = useCallback(() => {
    if (isFunction(onMouseEnter)) {
      onMouseEnter(showTooltip);
    } else {
      showTooltip();
    }
  }, [onMouseEnter, showTooltip]);

  const handleMouseLeave = useCallback(() => {
    if (isFunction(onMouseLeave)) {
      onMouseLeave(hideTooltip);
    } else {
      hideTooltip();
    }
  }, [onMouseLeave, hideTooltip]);

  return (
    <Box className={wrapperClassName}>
      <Box
        ref={wrapperRef}
        className="d-inline-block"
        {...restProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isFunction(children) ? children({
          showTooltip,
          hideTooltip,
          isOpen,
        }) : children}
      </Box>
      {isOpen && (
        <Box
          ref={tooltipRef}
          role="tooltip"
          className={tooltipClassName}
          style={tooltipStyles}
        >
          <Box className="tooltip__wrapper">
            {tooltip}
          </Box>
          {showArrow && (
            <Box
              ref={arrowRef}
              style={arrowStyles}
              className="tooltip__arrow"
            />
          )}
        </Box>
      )}
    </Box>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = tooltipPropTypes.props;

Tooltip.defaultProps = tooltipPropTypes.default;

export default Tooltip;
