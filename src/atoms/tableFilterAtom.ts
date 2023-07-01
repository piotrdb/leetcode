import {atom} from 'recoil';

export type TableFilterState = {
    type: 'order' | 'difficulty',
    order: 'ascending' | 'descending',
}

const initialTableFilterState: TableFilterState = {
    type: 'order',
    order: 'ascending'
}

export const tableFilterState = atom<TableFilterState>({
    key: 'sortedTableState',
    default: initialTableFilterState,
})
