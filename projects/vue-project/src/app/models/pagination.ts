import { ref } from 'vue';

export const DEFAULT_PAGE_SIZE = 5;

export interface TraitOption {
    value: string;
    label: string;
}

export const SORTABLE_ATTRIBUTES = ref([
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' },
    { value: 'speed', label: 'Speed' },
]);

export type SortableAttribute = 'name' | 'size' | 'speed' | null;

export function isValidSortableByAttribute(value: string | undefined | null): boolean {
    return Boolean(value && SORTABLE_ATTRIBUTES.value.find((sortable) => sortable.value === value));
}

export const SORTING_ORDERS = ref([
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
]);

export type SortingOrder = 'asc' | 'desc';

export function isValidSortingOrder(value: string | undefined): boolean {
    return Boolean(value && Boolean(SORTING_ORDERS.value.find((order) => order.value === value)));
}

export interface SortingAndFilteringForm {
    sortingByAttribute: SortableAttribute;
    sortingOrder: SortingOrder;
    filteringByTrait: string | null;

    [key: string]: string | null;
}

export type SortingAndFilteringQueryParams = Partial<SortingAndFilteringForm> & { pageNumber?: string };

export interface PaginationStoreState {
    page: number;
    totalNumberOfPages: number;
    pageSize: number;
    sortOrder: SortingOrder;
    sortByAttribute: SortableAttribute;
    filteringByTrait: string | null;
}

export const DEFAULT_SORTING_AND_FILTERING_FORM_STATE: SortingAndFilteringForm = {
    sortingByAttribute: null,
    sortingOrder: 'asc',
    filteringByTrait: null,
};

export function formEquals(form1: SortingAndFilteringForm, form2: SortingAndFilteringForm): boolean {
    if (form1 === form2) return true;

    let isEqual = true;

    Object.entries(form1).forEach(([key, value]) => {
        if (!isEqual) return;

        if (form2[key] !== value) {
            isEqual = false;
        }
    });

    return isEqual;
}
