import React, { useEffect, memo } from 'react';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, settingsMeta } from '@client/helpers/documentMeta';

const Settings = memo(() => {
  useEffect(() => {
    setTitle('Ustawienia');
    setMeta(settingsMeta());
  }, []);

  return (
    <PageWrapper>
      Ustawienia
    </PageWrapper>
  );
});

Settings.displayName = 'Settings';

export default Settings;
