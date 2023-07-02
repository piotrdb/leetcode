import {atom} from 'recoil';

export type TableSortState = {
    type: 'order' | 'difficulty',
    order: 'ascending' | 'descending',
}

const initialTableSortState: TableSortState = {
    type: 'order',
    order: 'ascending'
}

export const tableSortState = atom<TableSortState>({
    key: 'tableSortState',
    default: initialTableSortState,
})