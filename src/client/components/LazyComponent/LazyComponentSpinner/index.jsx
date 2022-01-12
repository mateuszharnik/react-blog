import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import LazyComponentWrapper from '@client/components/LazyComponent/LazyComponentWrapper';

const LazyComponentSpinner = memo(() => (
  <LazyComponentWrapper>
    <div className="text-primary text-center">
      <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />
    </div>
  </LazyComponentWrapper>
));

LazyComponentSpinner.displayName = 'LazyComponentSpinner';

export default LazyComponentSpinner;
