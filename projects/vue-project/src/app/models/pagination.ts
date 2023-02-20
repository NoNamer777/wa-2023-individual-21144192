export interface PaginationStoreState {
    currentPage: number;
    totalNumberOfPages: number;
    pageSize: number;
}

export const DEFAULT_PAGE_SIZE = 5;
