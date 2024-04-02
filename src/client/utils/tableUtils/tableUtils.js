import isString from 'lodash/isString';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { tableConstants } from '@shared/constants';

const { TABLE_SORT_TYPES } = tableConstants;

const TABLE_SORT_ICONS = {
  [TABLE_SORT_TYPES.ASC]: faCaretUp,
  [TABLE_SORT_TYPES.DESC]: faCaretDown,
  [TABLE_SORT_TYPES.NO_SORT]: faSort,
};

export const getTableSortIcon = (sortType) => TABLE_SORT_ICONS[
  isString(sortType) ? sortType.toUpperCase() : TABLE_SORT_TYPES.NO_SORT
];
