import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import { setTitle, setMeta, dashboardMeta } from '@client/helpers/documentMeta';

const Dashboard = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Panel administratora');
    setMeta(dashboardMeta());

    removeLayer();
  }, []);

  return (
    <div>
      Panel administratora
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
