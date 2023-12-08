import {
  useMemo, useCallback, useEffect, useRef,
} from 'react';
import { useFormik } from 'formik';

const useForm = ({
  initialValues = {},
  onSubmit = () => { },
  validationSchema,
}) => {
  const isInitialMount = useRef(true);

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
    dirty,
    isValid,
    validateForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      validateForm();
    }
  }, [validationSchema]);

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

  const checkIfFormIsValid = useCallback(() => (
    dirty ? (
      isValid && validationSchema.isValidSync(values)
    ) : false
  ), [dirty, isValid, values, validationSchema]);

  return {
    ...exposedFields,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    setErrors,
    setValues,
    setTouched,
    checkIfFormIsValid,
  };
};

export default useForm;
