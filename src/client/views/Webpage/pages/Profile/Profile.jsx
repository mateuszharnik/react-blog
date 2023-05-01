import { memo } from 'react';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const ProfileContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'profile' */ '@client/views/Webpage/pages/Profile/content/ProfileContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const Profile = memo(() => (
  <ProfileContent />
));

Profile.displayName = 'Profile';

export default Profile;
