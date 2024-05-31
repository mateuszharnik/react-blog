import {
  memo, useRef, useEffect, useCallback, useState, useMemo,
} from 'react';
import EasyMDE from 'easymde';
import { editorConfig as options } from '@client/configs/editorConfig';
import { editorPropTypes } from '@client/prop-types/editorPropTypes';
import FormValidationError from '@client/components/Forms/FormValidationError';
import Box from '@client/components/Box';
import { getEditorWrapperClassName } from './Editor.classes';

const Editor = memo(({
  id,
  name,
  initialValue,
  placeholder,
  errors,
  touched,
  setValues,
  setTouched,
  ...restProps
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const editorRef = useRef(null);
  const editor = useRef(null);

  const editorWrapperClassName = useMemo(() => getEditorWrapperClassName({
    isFocus,
    isValid: !errors && touched,
  }), [isFocus, errors, touched]);

  const setValue = useCallback(() => {
    setValues({ contents: editor.current.value() }, true);
  }, [editor, setValues]);

  const addFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const removeFocus = useCallback(() => {
    setTouched({ contents: true }, true);
    setIsFocus(false);
  }, [setTouched]);

  useEffect(() => {
    if (editorRef?.current) {
      editor.current = new EasyMDE({
        element: editorRef?.current,
        ...options,
        initialValue,
        placeholder,
      });

      editor.current.codemirror.on('change', setValue);
      editor.current.codemirror.on('focus', addFocus);
      editor.current.codemirror.on('blur', removeFocus);
    }

    return () => {
      editor.current.codemirror.off('change', setValue);
      editor.current.codemirror.off('focus', addFocus);
      editor.current.codemirror.off('blur', removeFocus);
      editor.current.toTextArea();
      editor.current = null;
    };
  }, []);

  return (
    <>
      <Box className={editorWrapperClassName}>
        <textarea
          id={id}
          ref={editorRef}
          name={name}
          className="visually-hidden"
          rows="10"
          {...restProps}
        />
      </Box>
      <FormValidationError
        touched={touched}
        error={errors}
      />
    </>
  );
});

Editor.displayName = 'Editor';

Editor.propTypes = editorPropTypes.props;

Editor.defaultProps = editorPropTypes.default;

export default Editor;
