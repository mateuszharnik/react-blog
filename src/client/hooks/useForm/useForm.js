import { useMemo } from 'react';
import { useFormik } from 'formik';

export const useForm = ({
  initialValues = {},
  onSubmit = () => { },
  validationSchema,
}) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
    setTouched,
    setErrors,
    setValues,
    errors: errorsMessages,
    values,
    touched,
    // TODO: Add dirty
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const fields = useMemo(() => Object.keys(initialValues).reduce((acc, valueKey) => {
    acc[valueKey] = {
      errors: errorsMessages[valueKey] || '',
      value: values[valueKey],
      meta: { touched: touched[valueKey] || false },
    };

    return acc;
  }, {}), [errorsMessages, values, touched]);

  const exposedFields = useMemo(() => Object.entries(fields).reduce((acc, [key, field]) => {
    const { value, errors, meta } = field;

    acc.values[key] = { value };
    acc.errors[key] = { value: errors };
    acc.touched[key] = { value: meta.touched };

    return acc;
  }, {
    values: {}, errors: {}, touched: {},
  }), [fields]);

  return {
    ...exposedFields,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    setErrors,
    setValues,
    setTouched,
  };
};
