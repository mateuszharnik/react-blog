import { memo, forwardRef, useMemo } from 'react';
import { formPropTypes } from '@client/prop-types/formPropTypes';
import { getFormClassName } from './Form.classes';

const Form = memo(forwardRef(({
  className,
  children,
  ...restProps
}, formRef) => {
  const formClassName = useMemo(() => getFormClassName({ className }), [className]);

  return (
    <form
      ref={formRef}
      className={formClassName}
      {...restProps}
    >
      {children}
    </form>
  );
}));

Form.displayName = 'Form';

Form.propTypes = formPropTypes.props;

Form.defaultProps = formPropTypes.default;

export default Form;
