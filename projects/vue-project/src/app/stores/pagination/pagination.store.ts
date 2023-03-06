import { DEFAULT_PAGE_SIZE, DEFAULT_SORTING } from '@vue-project/app/models/pagination';
import type {
    PaginationStoreState,
    SortableAttribute,
    SortingOptions,
    SortingOrder,
} from '@vue-project/app/models/pagination';
import { defineStore } from 'pinia';

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
            };
            this.filteringByTrait = trait;
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
