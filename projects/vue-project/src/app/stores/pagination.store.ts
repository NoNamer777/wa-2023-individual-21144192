import { defineStore } from 'pinia';

export interface PaginationStoreState {
    currentPage: number;
    pageSize: number;
}

export const DEFAULT_PAGE_SIZE = 5;

export const usePaginationStore = defineStore('pagination', {
    state: (): PaginationStoreState => ({
        currentPage: 1,
        pageSize: DEFAULT_PAGE_SIZE,
    }),
    getters: {
        getCurrentPage(): number {
            return this.currentPage;
        },
        getPageSize(): number {
            return this.pageSize;
        },
    },
});
