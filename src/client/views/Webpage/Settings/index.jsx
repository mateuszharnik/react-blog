import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/PageContainer';
import { setTitle, setMeta, settingsMeta } from '@client/helpers/documentMeta';

const Settings = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Ustawienia');
    setMeta(settingsMeta());

    removeLayer();
  }, []);

  return (
    <PageContainer>
      Ustawienia
    </PageContainer>
  );
});

Settings.displayName = 'Settings';

export default Settings;
