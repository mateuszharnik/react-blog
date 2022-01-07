import React, { memo } from 'react';

const LazyComponentError = memo(() => (
  <div>Nie udało się załadować komponentu. Spróbuj odświeżyć stronę.</div>
));

export default LazyComponentError;
