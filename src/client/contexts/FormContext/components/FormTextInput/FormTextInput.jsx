import { memo, forwardRef } from 'react';
import { useFormContext } from '@client/contexts/FormContext';
import { useFormsUtils } from '@client/hooks/useFormsUtils';
import { formContextElementsPropTypes } from '@client/prop-types/formContextElementsPropTypes';
import TextInput from '@client/components/Forms/FormTextInput';
import FormLabel from '@client/components/Forms/FormLabel';
import FormValidationError from '@client/components/Forms/FormValidationError';
import FormHelpText from '@client/components/Forms/FormHelpText';

const FormTextInput = memo(forwardRef(({
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
      <TextInput
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

FormTextInput.displayName = 'FormTextInput';

FormTextInput.propTypes = formContextElementsPropTypes.props;

FormTextInput.defaultProps = formContextElementsPropTypes.default;

export default FormTextInput;
