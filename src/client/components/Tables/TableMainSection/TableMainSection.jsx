import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const TableMainSection = memo(forwardRef(({
  children,
  ...restProps
}, tableMainSectionRef) => (
  <table
    ref={tableMainSectionRef}
    className="table table-dark table-hover mb-0"
    {...restProps}
  >
    {children}
  </table>
)));

TableMainSection.displayName = 'TableMainSection';

TableMainSection.propTypes = {
  children: childrenPropTypes.props,
};

TableMainSection.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableMainSection;
