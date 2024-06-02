import { memo, forwardRef } from 'react';
import { useFormContext } from '@client/contexts/FormContext';
import { useFormsUtils } from '@client/hooks/useFormsUtils';
import { formContextElementsPropTypes } from '@client/prop-types/formContextElementsPropTypes';
import RadioInput from '@client/components/Forms/FormRadioInput';
import FormLabel from '@client/components/Forms/FormLabel';
import Box from '@client/components/Box';

const FormRadioInput = memo(forwardRef(({
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
    components: { LabelComponent },
    utils: { isLabelString },
    actions: { handleChange, handleBlur },
  } = useFormsUtils({
    label,
    onBlur,
    onChange,
    form,
  });

  return (
    <Box className="form-check col-auto">
      <RadioInput
        id={id || field}
        ref={inputRef}
        name={field}
        checked={form.getFieldValue(field) === value}
        value={value}
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
  );
}));

FormRadioInput.displayName = 'FormRadioInput';

FormRadioInput.propTypes = formContextElementsPropTypes.props;

FormRadioInput.defaultProps = formContextElementsPropTypes.default;

export default FormRadioInput;
