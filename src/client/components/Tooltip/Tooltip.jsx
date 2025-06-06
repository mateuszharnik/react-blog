import isFunction from 'lodash/isFunction';
import { useFloatingPosition } from '@client/hooks/useFloatingPosition';
import { tooltipPropTypes } from '@client/prop-types/tooltipPropTypes';
import Box from '@client/components/Box';

import { getTooltipClassName } from './Tooltip.classes';

const Tooltip = ({
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
  triggerManual,
  onShowTooltip,
  onHideTooltip,
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

  const tooltipClassName = getTooltipClassName({ bordered, color });

  const handleShowTooltip = (event) => {
    if (isFunction(onShowTooltip)) {
      onShowTooltip(showTooltip.bind(null, event), event);
    } else {
      showTooltip(event);
    }
  };

  const handleHideTooltip = (event) => {
    if (isFunction(onHideTooltip)) {
      onHideTooltip(hideTooltip.bind(null, event), event);
    } else {
      hideTooltip(event);
    }
  };

  const optionalProps = triggerManual ? {} : {
    tabIndex: '0',
    onMouseEnter: handleShowTooltip,
    onFocus: handleShowTooltip,
    onMouseLeave: handleHideTooltip,
    onBlur: handleHideTooltip,
  };

  return (
    <Box className={className}>
      <Box
        ref={wrapperRef}
        className="d-inline-block"
        {...restProps}
        {...optionalProps}
      >
        {isFunction(children) ? children({
          handleShowTooltip,
          handleHideTooltip,
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
};

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = tooltipPropTypes.props;

Tooltip.defaultProps = tooltipPropTypes.default;

export default Tooltip;
