import {
  memo, useCallback, forwardRef, Fragment,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTableContext } from '@client/contexts/TableContext';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Footer from '@client/components/Tables/TableFooter';

const TableFooter = memo(forwardRef(({
  children,
  ...restProps
}, tableFooterRef) => {
  const { table } = useTableContext();

  const mappedFooters = useCallback((footers) => ({
    id: uuidv4(),
    ...footers.reduce((acc, next) => {
      acc[next.id] = next;

      return acc;
    }, {}),
  }), []);

  return (
    <Footer
      ref={tableFooterRef}
      {...restProps}
    >
      {table.getFooterGroups().map((footerGroup) => (
        <Fragment key={footerGroup.id}>
          {children({
            footer: mappedFooters(footerGroup.headers),
            footers: footerGroup.headers,
          })}
        </Fragment>
      ))}
    </Footer>
  );
}));

TableFooter.displayName = 'TableFooter';

TableFooter.propTypes = {
  children: childrenPropTypes.props,
};

TableFooter.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableFooter;
