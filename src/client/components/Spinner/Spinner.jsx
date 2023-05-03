import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { testsConstants } from '@shared/constants';

const Spinner = memo(() => (
  <div
    data-testid={testsConstants.SPINNER}
    className="text-primary text-center"
  >
    <FontAwesomeIcon
      icon={faCircleNotch}
      spin
      size="3x"
    />
  </div>
));

Spinner.displayName = 'Spinner';

export default Spinner;
