import {
  memo, createContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

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
        <div className="layer">
          <LazyComponentSpinner />
        </div>
      )}
      {children}
    </Context.Provider>
  );
});

LayerContext.displayName = 'LayerContext';

LayerContext.propTypes = {
  children: childrenPropTypes,
};

LayerContext.defaultProps = {
  children: childrenDefaultProps,
};

export default LayerContext;
