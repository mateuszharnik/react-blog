import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const View = memo(() => <Outlet />);

View.displayName = 'View';

export default View;
