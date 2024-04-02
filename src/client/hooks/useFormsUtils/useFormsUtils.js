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

  const handleChange = useCallback((e) => {
    if (onChange) {
      onChange(e);
    } else {
      form.handleChange(e);
    }
  }, [onChange, form.handleChange]);

  const handleBlur = useCallback((e) => {
    if (onBlur) {
      onBlur(e);
    } else {
      form.handleBlur(e);
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
