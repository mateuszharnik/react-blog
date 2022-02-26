import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/PageContainer';
import { setTitle, setMeta, profileMeta } from '@client/helpers/documentMeta';

const Profile = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Profil użytkownika');
    setMeta(profileMeta());

    removeLayer();
  }, []);

  return (
    <PageContainer>
      Profil użytkownika
    </PageContainer>
  );
});

Profile.displayName = 'Profile';

export default Profile;
