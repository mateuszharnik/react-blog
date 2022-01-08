import React, { useEffect, memo } from 'react';
import { setTitle } from '@client/helpers/documentMeta';

const NotFound = memo(() => {
  useEffect(() => {
    setTitle('404', '');
  }, []);

  return (
    <div>
      404
    </div>
  );
});

export default NotFound;
