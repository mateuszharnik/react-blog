import { memo, useMemo } from 'react';
import { formHelpTextPropTypes } from '@client/prop-types/formHelpTextPropTypes';
import Box from '@client/components/Box';
import { getFormHelpTextClassName } from './FormHelpText.classes';

const FormHelpText = memo(({ className, children, ...restProps }) => {
  const helpTextClassName = useMemo(() => getFormHelpTextClassName({
    className,
  }), [className]);

  return (
    <Box
      className={helpTextClassName}
      {...restProps}
    >
      {children}
    </Box>
  );
});

FormHelpText.displayName = 'FormHelpText';

FormHelpText.propTypes = formHelpTextPropTypes.props;

FormHelpText.defaultProps = formHelpTextPropTypes.default;

export default FormHelpText;
