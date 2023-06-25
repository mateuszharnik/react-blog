import {
  memo, createContext, useMemo, useState, useCallback,
} from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

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
        <div className="webpage-layer">
          <LazyWebpageComponentSpinner />
        </div>
      )}
      {children}
    </Context.Provider>
  );
});

WebpageLayerContext.displayName = 'WebpageLayerContext';

WebpageLayerContext.propTypes = {
  children: childrenPropTypes,
};

WebpageLayerContext.defaultProps = {
  children: childrenDefaultProps,
};

export default WebpageLayerContext;
