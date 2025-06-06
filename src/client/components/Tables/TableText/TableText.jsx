import { flexRender } from '@tanstack/react-table';
import { tableTextPropTypes } from '@client/prop-types/tableTextPropTypes';

const TableText = ({ text, context }) => flexRender(text, context);

TableText.displayName = 'TableText';

TableText.propTypes = tableTextPropTypes.props;

export default TableText;
