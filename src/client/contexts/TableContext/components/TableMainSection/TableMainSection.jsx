import { memo, forwardRef } from 'react';
import { useTableContext } from '@client/contexts/TableContext';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import MainSection from '@client/components/Tables/TableMainSection';
import EmptyState from '@client/components/Tables/TableEmptyState';

const TableMainSection = memo(forwardRef(({
  children,
  ...restProps
}, tableMainSectionRef) => {
  const { table } = useTableContext();

  return table.isEmptyState ? (
    <EmptyState>
      Brak danych
    </EmptyState>
  ) : (
    <MainSection
      ref={tableMainSectionRef}
      {...restProps}
    >
      {children}
    </MainSection>
  );
}));

TableMainSection.displayName = 'TableMainSection';

TableMainSection.propTypes = {
  children: childrenPropTypes.props,
};

TableMainSection.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableMainSection;
