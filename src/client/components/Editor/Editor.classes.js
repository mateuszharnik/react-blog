import { cva } from 'class-variance-authority';

export const getEditorWrapperClassName = cva('editor-wrapper', {
  variants: {
    isFocus: {
      true: 'focus',
    },
    isValid: {
      true: 'valid',
    },
  },
  defaultVariants: {
    isFocus: false,
    isValid: false,
  },
});
