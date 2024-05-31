import {
  useState, useMemo, useCallback, useRef,
} from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
} from '@floating-ui/react-dom';
import { propTypesConstants } from '@shared/constants';

const { FLOATING_POSITIONS } = propTypesConstants;

const opposeSizes = {
  [FLOATING_POSITIONS.LEFT]: FLOATING_POSITIONS.RIGHT,
  [FLOATING_POSITIONS.RIGHT]: FLOATING_POSITIONS.LEFT,
  [FLOATING_POSITIONS.TOP]: FLOATING_POSITIONS.BOTTOM,
  [FLOATING_POSITIONS.BOTTOM]: FLOATING_POSITIONS.TOP,
};

const useFloatingPosition = ({
  show = false,
  position = FLOATING_POSITIONS.TOP,
  offsetPadding = 12,
  shiftPadding = 8,
  maxWidth = undefined,
}) => {
  const [isOpen, setIsOpen] = useState(show);
  const [isFocus, setIsFocus] = useState(false);
  const arrowRef = useRef(null);

  const open = useMemo(() => isOpen || isFocus, [isOpen, isFocus]);

  const {
    refs, floatingStyles, middlewareData, placement, isPositioned,
  } = useFloating({
    transform: false,
    placement: position,
    whileElementsMounted: autoUpdate,
    open,
    middleware: [
      offset(offsetPadding),
      flip(),
      shift({ padding: shiftPadding }),
      arrow({ element: arrowRef }),
    ],
  });

  const opposeSize = useMemo(
    () => (opposeSizes[placement.split('-')[0]]),
    [placement],
  );

  const arrowStyles = useMemo(() => ({
    left: middlewareData?.arrow?.x ? `${middlewareData.arrow.x}px` : undefined,
    top: middlewareData?.arrow?.y ? `${middlewareData.arrow.y}px` : undefined,
    bottom: undefined,
    right: undefined,
    [opposeSize]: '-0.4rem',
  }), [opposeSize, middlewareData.arrow]);

  const elementStyles = useMemo(() => ({
    ...floatingStyles,
    maxWidth,
  }), [floatingStyles, maxWidth]);

  const showElement = useCallback((event) => {
    if (event.type === 'focus') {
      setIsFocus(true);
    }

    if (event.type === 'mouseenter') {
      setIsOpen(true);
    }
  }, []);

  const hideElement = useCallback((event) => {
    if (event.type === 'blur') {
      setIsFocus(false);
    }

    if (event.type === 'mouseleave') {
      setIsOpen(false);
    }
  }, []);

  return {
    elementRef: refs.setFloating,
    wrapperRef: refs.setReference,
    arrowRef,
    elementStyles,
    arrowStyles,
    middlewareData,
    isOpen: open,
    placement,
    isPositioned,
    actions: {
      showElement,
      hideElement,
    },
  };
};

export default useFloatingPosition;
