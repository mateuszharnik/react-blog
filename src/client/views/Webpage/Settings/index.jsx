import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, settingsMeta } from '@client/helpers/documentMeta';

const Settings = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Ustawienia');
    setMeta(settingsMeta());

    removeLayer();
  }, []);

  return (
    <PageWrapper>
      Ustawienia
    </PageWrapper>
  );
});

Settings.displayName = 'Settings';

export default Settings;
