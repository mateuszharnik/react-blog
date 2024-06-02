import { useSafeContext } from '@client/hooks/useSafeContext';
import { Context as TableContext } from '../../TableContext';

export const useTableContext = () => {
  const { table } = useSafeContext({ context: TableContext });

  return { table };
};
