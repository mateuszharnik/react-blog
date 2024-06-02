import {
  memo, createContext, useMemo, useEffect,
} from 'react';
import { useLayer } from '@client/hooks/useLayer';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyAdminComponentSpinner from '@client/views/Admin/components/LazyLoading/LazyAdminComponentSpinner';
import Box from '@client/components/Box';

export const Context = createContext();

const AdminLayerContext = memo(({ children, ...restProps }) => {
  const {
    isLayerActive: isAdminLayerActive,
    showLayer: showAdminLayer,
    hideLayer: hideAdminLayer,
    toggleBodyOverflow,
  } = useLayer();

  const context = useMemo(() => ({
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  }), [isAdminLayerActive, showAdminLayer, hideAdminLayer]);

  useEffect(() => {
    toggleBodyOverflow();
  }, [isAdminLayerActive]);

  return (
    <Context.Provider value={context}>
      {isAdminLayerActive && (
        <Box
          className="admin-layer"
          {...restProps}
        >
          <LazyAdminComponentSpinner />
        </Box>
      )}
      {children}
    </Context.Provider>
  );
});

AdminLayerContext.displayName = 'AdminLayerContext';

AdminLayerContext.propTypes = {
  children: childrenPropTypes.props,
};

AdminLayerContext.defaultProps = {
  children: childrenPropTypes.default,
};

export default AdminLayerContext;
