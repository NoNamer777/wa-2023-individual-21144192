import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_ORDER } from './constants';

export enum SortableAttribute {
    NONE = '',
    NAME = 'name',
    SIZE = 'size',
    SPEED = 'speed',
}

export enum SortOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc',
}

export interface Sorting {
    order: SortOrder;
    byAttribute?: SortableAttribute;
}

export interface Filters {
    hasTrait?: string;

    [filter: string]: string | boolean | number | undefined;
}

export class PaginationResponse<T> {
    pageSize = DEFAULT_PAGE_SIZE;
    page = 1;
    numberOfPages = 1;
    first = false;
    last = false;
    totalResults = 0;
    results: T[] = [];
    sorting: Sorting = {
        order: DEFAULT_SORT_ORDER,
    };
    filters?: Filters;

    constructor(results: T[]) {
        this.results = results;
    }
}
