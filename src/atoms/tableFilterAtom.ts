import {atom} from 'recoil';

export type TableFilterState = {
    categories: string[];
    difficulties: string[];
    statuses: string[];
    categoriesDropdownOpen: boolean;
    difficultiesDropdownOpen: boolean;
    statusesDropdownOpen: boolean;
    searchFilter: string;
}

const initialTableFilterState: TableFilterState = {
    categories: [],
    difficulties: [],
    statuses: [],
    categoriesDropdownOpen: false,
    difficultiesDropdownOpen: false,
    statusesDropdownOpen: false,
    searchFilter: '',
}

export const tableFilterState = atom<TableFilterState>({
    key: 'tableFilterState',
    default: initialTableFilterState,
})