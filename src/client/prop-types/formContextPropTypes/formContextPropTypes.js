import { func, bool, shape } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const formContextPropTypes = {
  props: {
    form: shape({
      isDirty: bool.isRequired,
      isValid: bool.isRequired,
      isComplete: bool.isRequired,
      isSubmitting: bool.isRequired,
      isValidating: bool.isRequired,
      errors: shape({}).isRequired,
      touched: shape({}).isRequired,
      values: shape({}).isRequired,
      initialValues: shape({}).isRequired,
      initialErrors: shape({}).isRequired,
      initialTouched: shape({}).isRequired,
      setTouched: func.isRequired,
      setFieldTouched: func.isRequired,
      setErrors: func.isRequired,
      setFieldError: func.isRequired,
      setValues: func.isRequired,
      setFieldValue: func.isRequired,
      setIsSubmitting: func.isRequired,
      handleChange: func.isRequired,
      handleBlur: func.isRequired,
      handleSubmit: func.isRequired,
      handleReset: func.isRequired,
      validateForm: func.isRequired,
      submitForm: func.isRequired,
      resetForm: func.isRequired,
      getFieldValue: func.isRequired,
      getFieldError: func.isRequired,
      getFieldTouched: func.isRequired,
    }).isRequired,
    onSubmit: func,
    children: childrenPropTypes.props,
  },
  default: {
    onSubmit: undefined,
    children: childrenPropTypes.default,
  },
};
