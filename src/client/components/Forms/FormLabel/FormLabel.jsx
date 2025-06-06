import { formLabelPropTypes } from '@client/prop-types/formLabelPropTypes';
import { getFormLabelClassName } from './FormLabel.classes';

const FormLabel = ({
  type, className, children, ...restProps
}) => {
  const labelClassName = getFormLabelClassName({ type, className });

  return (
    <>
      <label
        className={labelClassName}
        {...restProps}
      >
        {children}
      </label>{' '}
    </>
  );
};

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = formLabelPropTypes.props;

FormLabel.defaultProps = formLabelPropTypes.default;

export default FormLabel;
