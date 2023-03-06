import {
    DEFAULT_PAGE_SIZE,
    type PaginationStoreState,
    type SortableAttribute,
    type SortingOrder,
} from '@vue-project/app/models/pagination';
import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

export const usePaginationStore = defineStore('pagination', {
    state: (): PaginationStoreState => ({
        currentPage: 1,
        totalNumberOfPages: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        sortOrder: 'asc',
        sortByAttribute: null,
        filteringByTrait: null,
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
            this.setSortOrder('asc');
            this.setSortingByAttribute(null);
            this.setFilteringByTrait(null);
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
        getSortingOrder(): SortingOrder {
            return this.sortOrder;
        },
        getSortingByAttributes(): SortableAttribute {
            return this.sortByAttribute;
        },
        getFilteringByTrait(): string | null {
            return this.filteringByTrait;
        },
    },
});
