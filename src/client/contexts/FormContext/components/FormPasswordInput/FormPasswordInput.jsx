import { memo, forwardRef } from 'react';
import { useFormContext } from '@client/contexts/FormContext';
import { useFormsUtils } from '@client/hooks/useFormsUtils';
import { formContextElementsPropTypes } from '@client/prop-types/formContextElementsPropTypes';
import PasswordInput from '@client/components/Forms/FormPasswordInput';
import FormLabel from '@client/components/Forms/FormLabel';
import FormValidationError from '@client/components/Forms/FormValidationError';
import FormHelpText from '@client/components/Forms/FormHelpText';

const FormPasswordInput = memo(forwardRef(({
  id,
  value,
  field,
  label,
  helpText,
  onBlur,
  onChange,
  ...restProps
}, inputRef) => {
  const { form } = useFormContext();
  const {
    components: { LabelComponent, HelpTextComponent },
    utils: { isLabelString, isHelpTextString },
    actions: { handleChange, handleBlur },
  } = useFormsUtils({
    label,
    helpText,
    onBlur,
    onChange,
    form,
  });

  return (
    <>
      {label && (
        <FormLabel htmlFor={id || field}>
          {isLabelString ? label : <LabelComponent />}
        </FormLabel>
      )}
      <PasswordInput
        id={id || field}
        ref={inputRef}
        name={field}
        value={form.getFieldValue(field)}
        error={form.getFieldError(field)}
        touched={form.getFieldTouched(field)}
        {...restProps}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {helpText && (
        <FormHelpText>
          {isHelpTextString ? helpText : <HelpTextComponent />}
        </FormHelpText>
      )}
      <FormValidationError
        error={form.getFieldError(field)}
        touched={form.getFieldTouched(field)}
      />
    </>
  );
}));

FormPasswordInput.displayName = 'FormPasswordInput';

FormPasswordInput.propTypes = formContextElementsPropTypes.props;

FormPasswordInput.defaultProps = formContextElementsPropTypes.default;

export default FormPasswordInput;
