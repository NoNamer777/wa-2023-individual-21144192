import { DEFAULT_FILTERS, DEFAULT_PAGE_SIZE, DEFAULT_SORTING } from '@vue-project/app/models/pagination';
import type {
    FilterOptions,
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
        sorting: {
            ...DEFAULT_SORTING,
        },
        filters: {
            ...DEFAULT_FILTERS,
        },
    }),
    actions: {
        determineTotalNumberOfPages(numberOfItems: number): void {
            this.totalNumberOfPages = Math.ceil(numberOfItems / this.pageSize);
        },
        setCurrentPage(pageNumber: number): void {
            if (pageNumber <= 0 || pageNumber > this.totalNumberOfPages) return;
            this.page = pageNumber;
        },
        setSorting(sorting: Partial<SortingOptions>): void {
            this.sorting = {
                ...this.sorting,
                ...sorting,
            };
        },
        setFilters(filters: Partial<FilterOptions>): void {
            this.filters = {
                ...this.filters,
                ...filters,
            };
        },
        reset(): void {
            this.setCurrentPage(1);
            this.setSorting(DEFAULT_SORTING);
            this.setFilters(DEFAULT_FILTERS);
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
        getFiltersByTrait(): string | null {
            return this.filters.byTrait;
        },
    },
});
