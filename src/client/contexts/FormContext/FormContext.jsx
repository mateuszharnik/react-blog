import { memo, createContext, useMemo } from 'react';
import { formContextPropTypes } from '@client/prop-types/formContextPropTypes';
import Form from '@client/components/Forms/Form';

export const Context = createContext();

const FormContext = memo(({
  form, onSubmit, children, ...restProps
}) => {
  const handleSubmit = useMemo(() => onSubmit || form.handleSubmit, [onSubmit, form]);

  const context = useMemo(() => ({
    form,
  }), [form]);

  return (
    <Context.Provider value={context}>
      <Form
        {...restProps}
        onSubmit={handleSubmit}
      >
        {children}
      </Form>
    </Context.Provider>
  );
});

FormContext.displayName = 'FormContext';

FormContext.propTypes = formContextPropTypes.props;

FormContext.defaultProps = formContextPropTypes.default;

export default FormContext;
