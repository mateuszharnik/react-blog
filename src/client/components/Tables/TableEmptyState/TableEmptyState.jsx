import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyImage from '@client/components/Images/LazyImage';
import Box from '@client/components/Box';
import noData from '@client/assets/images/undraw_no_data_re_kwbl.svg';

const TableEmptyState = memo(forwardRef(({
  children,
  ...restProps
}, tableEmptyStateRef) => (
  <Box className="d-flex flex-column justify-content-center align-items-center p-4">
    <LazyImage
      src={noData}
      height={200}
      width={200}
      alt="Brak danych"
      spinnerClassName="table-empty-state__spinner"
      divClassName="d-flex justify-content-center align-items-center"
    />
    <Box
      ref={tableEmptyStateRef}
      className="mt-4"
      {...restProps}
    >
      {children}
    </Box>
  </Box>
)));

TableEmptyState.displayName = 'TableEmptyState';

TableEmptyState.propTypes = {
  children: childrenPropTypes.props,
};

TableEmptyState.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableEmptyState;
