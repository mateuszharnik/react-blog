import { memo, forwardRef, useMemo } from 'react';
import { formTextInputPropTypes } from '@client/prop-types/formTextInputPropTypes';
import { getTextInputClassName } from './FormTextInput.classes';

const FormTextInput = memo(forwardRef(({
  className,
  value,
  error,
  touched,
  type,
  onBlur,
  onChange,
  ...restProps
}, inputRef) => {
  const inputClassName = useMemo(() => getTextInputClassName({
    isValid: !error && touched,
    className,
  }), [error, touched, className]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={inputClassName}
      value={value}
      {...restProps}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}));

FormTextInput.displayName = 'FormTextInput';

FormTextInput.propTypes = formTextInputPropTypes.props;

FormTextInput.defaultProps = formTextInputPropTypes.default;

export default FormTextInput;
