import {
  memo, useCallback, forwardRef, Fragment,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTableContext } from '@client/contexts/TableContext';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Head from '@client/components/Tables/TableHead';

const TableHead = memo(forwardRef(({
  children,
  ...restProps
}, tableHeadRef) => {
  const { table } = useTableContext();

  const mappedHeaders = useCallback((headers) => ({
    id: uuidv4(),
    ...headers.reduce((acc, next) => {
      acc[next.id] = next;

      return acc;
    }, {}),
  }), []);

  return (
    <Head
      ref={tableHeadRef}
      {...restProps}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <Fragment key={headerGroup.id}>
          {children({
            header: mappedHeaders(headerGroup.headers),
            headers: headerGroup.headers,
          })}
        </Fragment>
      ))}
    </Head>
  );
}));

TableHead.displayName = 'TableHead';

TableHead.propTypes = {
  children: childrenPropTypes.props,
};

TableHead.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableHead;
