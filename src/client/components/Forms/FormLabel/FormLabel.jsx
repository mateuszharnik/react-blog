/* eslint-disable jsx-a11y/label-has-for */
import { memo, useMemo } from 'react';
import { formLabelPropTypes } from '@client/prop-types/formLabelPropTypes';
import { getFormLabelClassName } from './FormLabel.classes';

const FormLabel = memo(({
  type, className, children, ...restProps
}) => {
  const labelClassName = useMemo(() => getFormLabelClassName({
    type,
    className,
  }), [type, className]);

  return (
    <>
      <label
        className={labelClassName}
        {...restProps}
      >
        {children}
      </label>{' '}
    </>
  );
});

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = formLabelPropTypes.props;

FormLabel.defaultProps = formLabelPropTypes.default;

export default FormLabel;
