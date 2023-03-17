import { Filters, PaginationResponse, Race, SortableAttribute, Sorting, SortOrder } from '@dnd-mapp/data';

export interface SortingFilteringForm {
    sorting: Sorting;
    filters: Filters;
}

export type SortingUpdateValue = Partial<Sorting>;

export type FiltersUpdateValue = Partial<Filters>;

export interface SortingFilteringQueryParams {
    page: string;
    order: SortOrder;
    sortingByAttribute: SortableAttribute;
    hasTrait: string;

    [key: string]: string;
}

export type PaginationStoreValue = PaginationResponse<Race> & SortingFilteringForm;

export type PaginationStoreUpdateValue = Omit<PaginationStoreValue, 'sorting' | 'filters'>;
