import { memo, forwardRef } from 'react';
import { tableContextElementsPropTypes } from '@client/prop-types/tableContextElementsPropTypes';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Header from '@client/components/Tables/TableHeader';

const TableHeader = memo(forwardRef(({
  data,
  children,
  ...restProps
}, tableHeaderRef) => (
  <Header
    ref={tableHeaderRef}
    isPlaceholder={data?.isPlaceholder}
    getToggleSortingHandler={data?.column?.getToggleSortingHandler}
    getCanSort={data?.column?.getCanSort}
    getIsSorted={data?.column?.getIsSorted}
    className={data?.column?.getCanSort() ? 'th cursor-pointer select-none' : 'th'}
    {...restProps}
  >
    {children}
  </Header>
)));

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
  data: tableContextElementsPropTypes.props.header,
  children: childrenPropTypes.props,
};

TableHeader.defaultProps = {
  data: tableContextElementsPropTypes.default.header,
  children: childrenPropTypes.default,
};

export default TableHeader;
