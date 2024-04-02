import { memo, useMemo, forwardRef } from 'react';
import { formTextareaInputPropTypes } from '@client/prop-types/formTextareaInputPropTypes';
import { getTextareaInputClassName } from './FormTextareaInput.classes';

const FormTextareaInput = memo(forwardRef(({
  className,
  value,
  error,
  touched,
  rows,
  onBlur,
  onChange,
  ...restProps
}, textareaRef) => {
  const textareaClassName = useMemo(() => getTextareaInputClassName({
    isValid: !error && touched,
    className,
  }), [error, touched, className]);

  return (
    <textarea
      ref={textareaRef}
      rows={rows}
      className={textareaClassName}
      value={value}
      {...restProps}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}));

FormTextareaInput.displayName = 'FormTextareaInput';

FormTextareaInput.propTypes = formTextareaInputPropTypes.props;

FormTextareaInput.defaultProps = formTextareaInputPropTypes.default;

export default FormTextareaInput;
