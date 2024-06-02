import {
  memo, useMemo, useEffect, useRef, useImperativeHandle, forwardRef,
} from 'react';
import { formCheckboxInputPropTypes } from '@client/prop-types/formCheckboxInputPropTypes';
import { getCheckboxInputClassName } from './FormCheckboxInput.classes';

const FormCheckboxInput = memo(forwardRef(({
  className,
  value,
  checked,
  type,
  onBlur,
  onChange,
  ...restProps
}, ref) => {
  const inputRef = useRef(null);

  const inputClassName = useMemo(() => getCheckboxInputClassName({
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
        type="checkbox"
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

FormCheckboxInput.displayName = 'FormCheckboxInput';

FormCheckboxInput.propTypes = formCheckboxInputPropTypes.props;

FormCheckboxInput.defaultProps = formCheckboxInputPropTypes.default;

export default FormCheckboxInput;
