import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, dashboardMeta } from '@client/helpers/documentMeta';

const Dashboard = memo(() => {
  useEffect(() => {
    setTitle('Panel administratora');
    setMeta(dashboardMeta());
  }, []);

  return (
    <div>
      Panel administratora
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
