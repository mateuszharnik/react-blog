import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const Main = memo(() => (
  <main>
    <Outlet />
  </main>
));

Main.displayName = 'Main';

export default Main;
