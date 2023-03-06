import { ref } from 'vue';
import type { Ref } from 'vue';

export const DEFAULT_PAGE_SIZE = 5;

export const SORTABLE_ATTRIBUTES = ref([
    { value: 'name', label: 'Name' },
    { value: 'size', label: 'Size' },
    { value: 'speed', label: 'Speed' },
]);

export type SortableAttribute = 'name' | 'size' | 'speed' | null;

export function isValidSortableByAttribute(value: string | undefined | null): boolean {
    return Boolean(value && SORTABLE_ATTRIBUTES.value.find((sortable) => sortable.value === value));
}

export const SORTING_ORDERS: Ref<{ value: SortingOrder; label: string }[]> = ref([
    { value: 'asc' as SortingOrder, label: 'Ascending' },
    { value: 'desc' as SortingOrder, label: 'Descending' },
]);

export type SortingOrder = 'asc' | 'desc';

export interface SortingOptions {
    order: SortingOrder;
    onAttribute: SortableAttribute;
}

export const DEFAULT_SORTING: SortingOptions = {
    order: 'asc',
    onAttribute: null,
};

export function isValidSortingOrder(value: string | undefined): boolean {
    return Boolean(value && Boolean(SORTING_ORDERS.value.find((order) => order.value === value)));
}

export interface FilterOptions {
    byTrait: string | null;
}

export const DEFAULT_FILTERS: FilterOptions = {
    byTrait: null,
};

export interface SortingFilteringForm {
    sortingByAttribute: SortableAttribute;
    sortingOrder: SortingOrder;
    filteringByTrait: string | null;

    [key: string]: string | null;
}

export type SortingFilteringQueryParams = Partial<SortingFilteringForm> & { pageNumber?: string };

export interface PaginationStoreState {
    page: number;
    totalNumberOfPages: number;
    pageSize: number;
    sorting: SortingOptions;
    filters: FilterOptions;
}

export const DEFAULT_SORTING_FILTERING_FORM_STATE: SortingFilteringForm = {
    sortingByAttribute: DEFAULT_SORTING.onAttribute,
    sortingOrder: DEFAULT_SORTING.order,
    filteringByTrait: DEFAULT_FILTERS.byTrait,
};

export function formEquals(form1: SortingFilteringForm, form2: SortingFilteringForm): boolean {
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
