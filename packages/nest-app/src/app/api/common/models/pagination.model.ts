export type SortableAttribute = 'name' | 'size' | 'speed';

export type SortOrder = 'asc' | 'desc';

export const DEFAULT_SORT_ORDER: SortOrder = 'asc';

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
