import {
    DEFAULT_PAGE_SIZE,
    type PaginationStoreState,
    type SortableAttribute,
    type SortingOrder,
} from '@vue-project/app/models/pagination';
import { defineStore } from 'pinia';

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
        setCurrentPage(pageNumber: number): void {
            if (pageNumber < 0 || pageNumber > this.totalNumberOfPages) return;
            this.currentPage = pageNumber;
        },
        setSortOrder(order: SortingOrder): void {
            this.sortOrder = order;
        },
        setSortingByAttribute(attribute: SortableAttribute): void {
            this.sortByAttribute = attribute;
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
