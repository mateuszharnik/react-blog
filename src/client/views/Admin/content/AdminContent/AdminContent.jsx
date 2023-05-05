import { memo, useEffect } from 'react';
import { View } from '@client/router/components';
import { useLayerContext } from '@client/context/LayerContext';

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
