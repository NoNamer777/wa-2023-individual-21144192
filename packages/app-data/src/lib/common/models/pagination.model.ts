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
