import { memo } from 'react';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const AdminContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'admin' */ '@client/views/Admin/content/AdminContent'),
});

const Admin = memo(() => (
  <AdminContent />
));

Admin.displayName = 'Admin';

export default Admin;
