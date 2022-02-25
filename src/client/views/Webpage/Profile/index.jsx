import React, { useEffect, memo } from 'react';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, profileMeta } from '@client/helpers/documentMeta';

const Profile = memo(() => {
  useEffect(() => {
    setTitle('Profil użytkownika');
    setMeta(profileMeta());
  }, []);

  return (
    <PageWrapper>
      Profil użytkownika
    </PageWrapper>
  );
});

Profile.displayName = 'Profile';

export default Profile;
