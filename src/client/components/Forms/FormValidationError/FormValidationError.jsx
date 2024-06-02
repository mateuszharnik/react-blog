import { memo, useMemo } from 'react';
import { formValidationErrorPropTypes } from '@client/prop-types/formValidationErrorPropTypes';
import Box from '@client/components/Box';
import { getFormValidationErrorClassName } from './FormValidationError.classes';

const FormValidationError = memo(({
  error, touched, className, ...restProps
}) => {
  const validationErrorClassName = useMemo(() => getFormValidationErrorClassName({
    className,
  }), [className]);

  return error && touched ? (
    <Box
      className={validationErrorClassName}
      {...restProps}
    >
      {error}
    </Box>
  ) : null;
});

FormValidationError.displayName = 'FormValidationError';

FormValidationError.propTypes = formValidationErrorPropTypes.props;

FormValidationError.defaultProps = formValidationErrorPropTypes.default;

export default FormValidationError;
