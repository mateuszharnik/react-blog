import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, profileMeta } from '@client/helpers/documentMeta';

const Profile = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Profil użytkownika');
    setMeta(profileMeta());

    removeLayer();
  }, []);

  return (
    <PageWrapper>
      Profil użytkownika
    </PageWrapper>
  );
});

Profile.displayName = 'Profile';

export default Profile;
