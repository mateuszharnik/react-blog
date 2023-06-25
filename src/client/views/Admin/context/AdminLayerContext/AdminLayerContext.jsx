import {
  memo, createContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import LazyAdminComponentSpinner from '@client/views/Admin/components/LazyLoading/LazyAdminComponentSpinner';

export const Context = createContext();

const AdminLayerContext = memo(({ children }) => {
  const [isAdminLayerActive, setIsAdminLayerActive] = useState(true);

  const showAdminLayer = useCallback(() => {
    setIsAdminLayerActive(true);
  }, []);

  const hideAdminLayer = useCallback(() => {
    setIsAdminLayerActive(false);
  }, []);

  const value = useMemo(() => ({
    isAdminLayerActive,
    showAdminLayer,
    hideAdminLayer,
  }), [isAdminLayerActive, showAdminLayer, hideAdminLayer]);

  useEffect(() => {
    if (isAdminLayerActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isAdminLayerActive]);

  return (
    <Context.Provider value={value}>
      {isAdminLayerActive && (
        <div className="admin-layer">
          <LazyAdminComponentSpinner />
        </div>
      )}
      {children}
    </Context.Provider>
  );
});

AdminLayerContext.displayName = 'AdminLayerContext';

AdminLayerContext.propTypes = {
  children: childrenPropTypes,
};

AdminLayerContext.defaultProps = {
  children: childrenDefaultProps,
};

export default AdminLayerContext;
