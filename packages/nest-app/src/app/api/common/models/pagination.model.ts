export enum SortableAttribute {
    NAME = 'name',
    SIZE = 'size',
    SPEED = 'speed',
    NONE = 'null',
}

export const DEFAULT_SORTING_BY_ATTRIBUTE = SortableAttribute.NONE;

export enum SortOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc',
}

export const DEFAULT_SORT_ORDER: SortOrder = SortOrder.ASCENDING;

export const DEFAULT_PAGE_SIZE = 5;

export class PaginationResponse<T> {
    pageSize = DEFAULT_PAGE_SIZE;
    page = 1;
    numberOfPages = 1;
    first = false;
    last = false;
    sortOrder = DEFAULT_SORT_ORDER;
    totalResults = 0;
    results: T[] = [];

    constructor(results: T[]) {
        this.results = results;
    }
}
