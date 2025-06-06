import { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { formPasswordInputPropTypes } from '@client/prop-types/formPasswordInputPropTypes';
import Box from '@client/components/Box';
import { getPasswordInputClassName } from './FormPasswordInput.classes';

const PATH = 'forms';

const FormPasswordInput = forwardRef(({
  className,
  value,
  error,
  touched,
  showToggler,
  type,
  onBlur,
  onChange,
  ...restProps
}, inputRef) => {
  const { t } = useTranslation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputClassName = getPasswordInputClassName({
    isValid: !error && touched,
    showToggler,
    className,
  });

  const inputType = isPasswordVisible ? 'text' : 'password';

  const icon = isPasswordVisible ? faEye : faEyeSlash;

  const title = isPasswordVisible ? `${PATH}.HIDE_PASSWORD` : `${PATH}.SHOW_PASSWORD`;

  const toggleShowPassword = () => {
    setIsPasswordVisible((state) => !state);
  };

  return (
    <Box className="position-relative">
      <input
        ref={inputRef}
        type={inputType}
        className={inputClassName}
        value={value}
        {...restProps}
        onChange={onChange}
        onBlur={onBlur}
      />
      {showToggler && value && (
        <button
          className="password-input__toggler-button"
          type="button"
          title={t(title)}
          onClick={toggleShowPassword}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      )}
    </Box>
  );
});

FormPasswordInput.displayName = 'FormPasswordInput';

FormPasswordInput.propTypes = formPasswordInputPropTypes.props;

FormPasswordInput.defaultProps = formPasswordInputPropTypes.default;

export default FormPasswordInput;
