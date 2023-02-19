import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

export interface PaginationStoreState {
    currentPage: number;
    totalNumberOfPages: number;
    pageSize: number;
}

export const DEFAULT_PAGE_SIZE = 5;

export const usePaginationStore = defineStore('pagination', {
    state: (): PaginationStoreState => ({
        currentPage: 1,
        totalNumberOfPages: 1,
        pageSize: DEFAULT_PAGE_SIZE,
    }),
    actions: {
        determineTotalNumberOfPages(numberOfItems: number): void {
            this.totalNumberOfPages = Math.ceil(numberOfItems / this.pageSize);
        },
        watchPageNumberParam(): void {
            const route = useRoute();

            watch(
                () => route.query.pageNumber as string,
                (pageNumber) => {
                    if (!pageNumber) return;
                    this.currentPage = parseInt(pageNumber);
                }
            );
        },
    },
    getters: {
        getCurrentPage(): number {
            return this.currentPage;
        },
        getPageSize(): number {
            return this.pageSize;
        },
        getTotalNumberOfPages(): number {
            return this.totalNumberOfPages;
        },
    },
});
