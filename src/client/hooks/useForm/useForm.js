import { useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import { isSchema } from 'yup';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

const useForm = ({
  onSubmit,
  validationSchema,
  initialValues: formValues = {},
  ...restProps
}) => {
  const {
    dirty,
    isValid,
    isSubmitting,
    isValidating,
    values,
    errors,
    touched,
    initialValues,
    initialErrors,
    initialTouched,
    setTouched,
    setFieldTouched,
    setErrors,
    setFieldError,
    setValues,
    setFieldValue,
    setSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    validateForm,
    submitForm,
    resetForm,
    getFieldMeta,
  } = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit,
    ...restProps,
  });

  const getFieldValue = useCallback((field) => {
    if (!isString(field)) return;

    const metadata = getFieldMeta(field);

    return metadata?.value;
  }, [getFieldMeta]);

  const getFieldError = useCallback((field) => {
    if (!isString(field)) return;

    const metadata = getFieldMeta(field);

    return metadata?.error;
  }, [getFieldMeta]);

  const getFieldTouched = useCallback((field) => {
    if (!isString(field)) return;

    const metadata = getFieldMeta(field);

    return metadata?.touched;
  }, [getFieldMeta]);

  const isComplete = useMemo(() => {
    const schema = isFunction(validationSchema)
      ? validationSchema(values) : validationSchema;

    const hasNoErrors = isSchema(schema) ? schema.isValidSync(values) : true;

    return dirty ? isValid && hasNoErrors : false;
  },
  [dirty, isValid, values, validationSchema]);

  return {
    isDirty: dirty,
    isValid,
    isComplete,
    isSubmitting,
    isValidating,
    values,
    errors,
    touched,
    initialValues,
    initialErrors,
    initialTouched,
    setTouched,
    setFieldTouched,
    setErrors,
    setFieldError,
    setValues,
    setFieldValue,
    setIsSubmitting: setSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    validateForm,
    submitForm,
    resetForm,
    getFieldValue,
    getFieldError,
    getFieldTouched,
  };
};

export default useForm;
