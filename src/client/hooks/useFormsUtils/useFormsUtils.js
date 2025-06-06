import { useCallback } from 'react';
import isString from 'lodash/isString';

const useFormsUtils = ({
  label = '',
  helpText = '',
  onChange,
  onBlur,
  form,
}) => {
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
      LabelComponent: label,
      HelpTextComponent: helpText,
    },
    utils: {
      isLabelString: isString(label),
      isHelpTextString: isString(helpText),
    },
    actions: {
      handleChange,
      handleBlur,
    },
  };
};

export default useFormsUtils;
