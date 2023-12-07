import { memo, useEffect } from 'react';
import { useLayerContext } from '@client/contexts/LayerContext';
import View from '@client/router/components/View';

const AdminContent = memo(() => {
  const { hideLayer } = useLayerContext();

  useEffect(() => {
    hideLayer();
  }, []);

  return (
    <View />
  );
});

AdminContent.displayName = 'AdminContent';

export default AdminContent;
