import {
  memo, createContext, useMemo, useEffect,
} from 'react';
import { useLayer } from '@client/hooks/useLayer';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';
import Box from '@client/components/Box';

export const Context = createContext();

const LayerContext = memo(({ children, ...restProps }) => {
  const {
    isLayerActive,
    showLayer,
    hideLayer,
    toggleBodyOverflow,
  } = useLayer();

  useEffect(() => {
    toggleBodyOverflow();
  }, [isLayerActive]);

  const context = useMemo(() => ({
    isLayerActive,
    showLayer,
    hideLayer,
  }), [isLayerActive, showLayer, hideLayer]);

  return (
    <Context.Provider value={context}>
      {isLayerActive && (
        <Box
          className="layer"
          {...restProps}
        >
          <LazyComponentSpinner />
        </Box>
      )}
      {children}
    </Context.Provider>
  );
});

LayerContext.displayName = 'LayerContext';

LayerContext.propTypes = {
  children: childrenPropTypes.props,
};

LayerContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default LayerContext;
