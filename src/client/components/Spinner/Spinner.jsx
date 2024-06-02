import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { testsConstants } from '@shared/constants';
import Box from '@client/components/Box';

const Spinner = memo((props) => (
  <Box
    data-testid={testsConstants.SPINNER}
    className="text-primary text-center"
    {...props}
  >
    <FontAwesomeIcon
      icon={faCircleNotch}
      spin
      size="3x"
    />
  </Box>
));

Spinner.displayName = 'Spinner';

export default Spinner;
