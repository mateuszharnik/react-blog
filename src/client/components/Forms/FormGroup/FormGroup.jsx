import { formGroupPropTypes } from '@client/prop-types/formGroupPropTypes';
import Box from '@client/components/Box';
import { getFormGroupClassName } from './FormGroup.classes';

const FormGroup = ({
  className, type, children, ...restProps
}) => {
  const formGroupClassName = getFormGroupClassName({ type, className });

  return (
    <Box
      className={formGroupClassName}
      {...restProps}
    >
      {children}
    </Box>
  );
};

FormGroup.displayName = 'FormGroup';

FormGroup.propTypes = formGroupPropTypes.props;

FormGroup.defaultProps = formGroupPropTypes.default;

export default FormGroup;
