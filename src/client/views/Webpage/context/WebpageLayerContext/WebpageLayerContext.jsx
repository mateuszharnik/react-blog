import {
  memo, createContext, useMemo, useState, useCallback,
} from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';
import Box from '@client/components/Box';

export const Context = createContext();

const WebpageLayerContext = memo(({ children }) => {
  const [isWebpageLayerActive, setIsWebpageLayerActive] = useState(true);

  const showWebpageLayer = useCallback(() => {
    setIsWebpageLayerActive(true);
  }, []);

  const hideWebpageLayer = useCallback(() => {
    setIsWebpageLayerActive(false);
  }, []);

  const value = useMemo(() => ({
    isWebpageLayerActive,
    showWebpageLayer,
    hideWebpageLayer,
  }), [isWebpageLayerActive, showWebpageLayer, hideWebpageLayer]);

  return (
    <Context.Provider value={value}>
      {isWebpageLayerActive && (
        <Box className="webpage-layer">
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
