import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as FormContext } from '../../FormContext';

export const useFormContext = () => {
  const { form } = useSafeContext({ context: FormContext });

  return { form };
};
