import {
  memo, useMemo, useEffect, useRef, useImperativeHandle, forwardRef,
} from 'react';
import { formRadioInputPropTypes } from '@client/prop-types/formRadioInputPropTypes';
import { getRadioInputClassName } from './FormRadioInput.classes';

const FormRadioInput = memo(forwardRef(({
  className,
  value,
  checked,
  type,
  onBlur,
  onChange,
  ...restProps
}, ref) => {
  const inputRef = useRef(null);

  const inputClassName = useMemo(() => getRadioInputClassName({
    className,
  }), [className]);

  useImperativeHandle(ref, () => inputRef, []);

  useEffect(() => {
    inputRef.current.removeAttribute('checked');
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        type="radio"
        className={inputClassName}
        value={value}
        checked={checked}
        {...restProps}
        onChange={onChange}
        onBlur={onBlur}
      />{' '}
    </>
  );
}));

FormRadioInput.displayName = 'FormRadioInput';

FormRadioInput.propTypes = formRadioInputPropTypes.props;

FormRadioInput.defaultProps = formRadioInputPropTypes.default;

export default FormRadioInput;
