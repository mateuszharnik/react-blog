import React, { memo } from 'react';
import { useStoreState } from 'easy-peasy';
import Router from '@client/router.js';

const App = memo(() => {
  // eslint-disable-next-line no-unused-vars
  const message = useStoreState(({ app }) => app.message);

  return (
    <Router />
  );
});

App.displayName = 'App';

export default App;
