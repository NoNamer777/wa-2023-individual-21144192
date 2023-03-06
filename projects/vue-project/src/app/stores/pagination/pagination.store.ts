import { DEFAULT_PAGE_SIZE, DEFAULT_SORTING } from '@vue-project/app/models/pagination';
import type {
    PaginationStoreState,
    SortableAttribute,
    SortingOptions,
    SortingOrder,
} from '@vue-project/app/models/pagination';
import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

export const usePaginationStore = defineStore('pagination', {
    state: (): PaginationStoreState => ({
        page: 1,
        totalNumberOfPages: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        filteringByTrait: null,
        sorting: {
            ...DEFAULT_SORTING,
        },
    }),
    actions: {
        determineTotalNumberOfPages(numberOfItems: number): void {
            this.totalNumberOfPages = Math.ceil(numberOfItems / this.pageSize);
        },
        setCurrentPage(pageNumber: number): void {
            if (pageNumber < 0 || pageNumber > this.totalNumberOfPages) return;
            this.page = pageNumber;
        },
        setSorting(sorting: Partial<SortingOptions>): void {
            this.sorting = {
                ...this.sorting,
                ...sorting,
            };
        },
        setFilteringByTrait(trait: string | null): void {
            const { route, router } = {
                route: useRoute(),
                router: useRouter(),
            };
            this.filteringByTrait = trait;

            if (trait === null && Boolean(route?.query?.filteringByTrait)) {
                const queryParams = route.query;

                delete queryParams.filteringByTrait;
                router.push({ name: 'Overview', query: queryParams });
            }
        },
        reset(): void {
            this.setCurrentPage(1);
            this.setFilteringByTrait(null);
            this.setSorting(DEFAULT_SORTING);
        },
    },
    getters: {
        getCurrentPage(): number {
            return this.page;
        },
        getPageSize(): number {
            return this.pageSize;
        },
        getTotalNumberOfPages(): number {
            return this.totalNumberOfPages;
        },
        getSortingOrder(): SortingOrder {
            return this.sorting.order;
        },
        getSortingOnAttribute(): SortableAttribute {
            return this.sorting.onAttribute;
        },
            return this.filteringByTrait;
        getFiltersByTrait(): string | null {
        },
    },
});
