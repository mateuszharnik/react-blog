import { memo, createContext, useMemo } from 'react';
import { useLayer } from '@client/hooks/useLayer';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';
import Box from '@client/components/Box';

export const Context = createContext();

const WebpageLayerContext = memo(({ children, ...restProps }) => {
  const {
    isLayerActive: isWebpageLayerActive,
    showLayer: showWebpageLayer,
    hideLayer: hideWebpageLayer,
  } = useLayer();

  const context = useMemo(() => ({
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  }), [isWebpageLayerActive, showWebpageLayer, hideWebpageLayer]);

  return (
    <Context.Provider value={context}>
      {isWebpageLayerActive && (
        <Box
          className="webpage-layer"
          {...restProps}
        >
          <LazyWebpageComponentSpinner />
        </Box>
      )}
      {children}
    </Context.Provider>
  );
});

WebpageLayerContext.displayName = 'WebpageLayerContext';

WebpageLayerContext.propTypes = {
  children: childrenPropTypes.props,
};

WebpageLayerContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default WebpageLayerContext;
