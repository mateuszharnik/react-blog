import { useMemo, useCallback } from 'react';
import isString from 'lodash/isString';

const useFormsUtils = ({
  label = '',
  helpText = '',
  onChange,
  onBlur,
  form,
}) => {
  const LabelComponent = useMemo(() => label, [label]);

  const HelpTextComponent = useMemo(() => helpText, [helpText]);

  const isLabelString = useMemo(() => isString(label), [label]);

  const isHelpTextString = useMemo(() => isString(helpText), [helpText]);

  const handleChange = useCallback((event) => {
    if (onChange) {
      onChange(event);
    } else {
      form.handleChange(event);
    }
  }, [onChange, form.handleChange]);

  const handleBlur = useCallback((event) => {
    if (onBlur) {
      onBlur(event);
    } else {
      form.handleBlur(event);
    }
  }, [onBlur, form.handleBlur]);

  return {
    components: {
      LabelComponent,
      HelpTextComponent,
    },
    utils: {
      isLabelString,
      isHelpTextString,
    },
    actions: {
      handleChange,
      handleBlur,
    },
  };
};

export default useFormsUtils;
