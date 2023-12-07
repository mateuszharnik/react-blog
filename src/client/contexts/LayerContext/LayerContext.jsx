import {
  memo, createContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';
import Box from '@client/components/Box';

export const Context = createContext();

const LayerContext = memo(({ children }) => {
  const [isLayerActive, setIsLayerActive] = useState(true);

  const showLayer = useCallback(() => {
    setIsLayerActive(true);
  }, []);

  const hideLayer = useCallback(() => {
    setIsLayerActive(false);
  }, []);

  const value = useMemo(() => ({
    isLayerActive,
    showLayer,
    hideLayer,
  }), [isLayerActive, showLayer, hideLayer]);

  useEffect(() => {
    if (isLayerActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isLayerActive]);

  return (
    <Context.Provider value={value}>
      {isLayerActive && (
        <Box className="layer">
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
