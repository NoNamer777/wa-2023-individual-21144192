import { ref } from 'vue';

export const DEFAULT_PAGE_SIZE = 5;

export const SORTABLE_ATTRIBUTES = ref([
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' },
    { value: 'speed', label: 'Speed' },
]);

export type SortableAttribute = 'name' | 'size' | 'speed' | null;

export const SORTING_ORDERS = ref([
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
]);

export type SortingOrder = 'asc' | 'desc';

export interface SortingAndFilteringForm {
    sortingByAttribute: SortableAttribute;
    sortingOrder: SortingOrder;

    [key: string]: string | null;
}
export interface PaginationStoreState {
    currentPage: number;
    totalNumberOfPages: number;
    pageSize: number;
    sortOrder: SortingOrder;
    sortByAttribute: SortableAttribute;
}

