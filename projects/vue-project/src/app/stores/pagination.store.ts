import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { DEFAULT_PAGE_SIZE, type PaginationStoreState } from '@vue-project/app/models/pagination';

export const usePaginationStore = defineStore('pagination', {
    state: (): PaginationStoreState => ({
        currentPage: 1,
        totalNumberOfPages: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        sortOrder: 'asc',
        sortByAttribute: null,
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
