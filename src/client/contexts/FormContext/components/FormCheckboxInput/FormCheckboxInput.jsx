import { memo, forwardRef } from 'react';
import { useFormContext } from '@client/contexts/FormContext';
import { useFormsUtils } from '@client/hooks/useFormsUtils';
import { formContextElementsPropTypes } from '@client/prop-types/formContextElementsPropTypes';
import CheckboxInput from '@client/components/Forms/FormCheckboxInput';
import FormLabel from '@client/components/Forms/FormLabel';
import FormValidationError from '@client/components/Forms/FormValidationError';
import FormHelpText from '@client/components/Forms/FormHelpText';
import Box from '@client/components/Box';

const FormCheckboxInput = memo(forwardRef(({
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
      <Box className="form-check d-inline-block">
        <CheckboxInput
          id={id || field}
          ref={inputRef}
          name={field}
          checked={form.getFieldValue(field)}
          value={form.getFieldValue(field)}
          {...restProps}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {label && (
          <>
            <FormLabel
              htmlFor={id || field}
              type="check"
            >
              {isLabelString ? label : <LabelComponent />}
            </FormLabel>{' '}
          </>
        )}
      </Box>
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

FormCheckboxInput.displayName = 'FormCheckboxInput';

FormCheckboxInput.propTypes = formContextElementsPropTypes.props;

FormCheckboxInput.defaultProps = formContextElementsPropTypes.default;

export default FormCheckboxInput;
