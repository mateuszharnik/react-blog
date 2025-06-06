import { forwardRef } from 'react';
import { formPropTypes } from '@client/prop-types/formPropTypes';
import { getFormClassName } from './Form.classes';

const Form = forwardRef(({
  className,
  children,
  ...restProps
}, formRef) => {
  const formClassName = getFormClassName({ className });

  return (
    <form
      ref={formRef}
      className={formClassName}
      {...restProps}
    >
      {children}
    </form>
  );
});

Form.displayName = 'Form';

Form.propTypes = formPropTypes.props;

Form.defaultProps = formPropTypes.default;

export default Form;
