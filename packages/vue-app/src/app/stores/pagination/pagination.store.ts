import { DEFAULT_PAGE_SIZE, DEFAULT_SORT_BY_ATTRIBUTE, DEFAULT_SORT_ORDER, Race } from '@dnd-mapp/data';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
    FiltersUpdateValue,
    PaginationStoreUpdateValue,
    PaginationStoreValue,
    SortingUpdateValue,
} from '../../models';

export const usePaginationStore = defineStore('pagination', () => {
    const pagination = ref<PaginationStoreValue>({
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        numberOfPages: 1,
        first: true,
        last: true,
        totalResults: 0,
        results: [],
        sorting: {
            order: DEFAULT_SORT_ORDER,
            byAttribute: DEFAULT_SORT_BY_ATTRIBUTE,
        },
        filters: {},
    });

    function patchState(value: PaginationStoreUpdateValue): void {
        setPage(value.page);
        setPageSize(value.pageSize);
        setNumberOfPages(value.numberOfPages);
        setFirst(value.first);
        setLast(value.last);
        setTotalResults(value.totalResults);
        setResults(value.results);
    }

    function setPage(page: number): void {
        pagination.value.page = page;
    }

    function setPageSize(pageSize: number): void {
        pagination.value.pageSize = pageSize;
    }

    function setNumberOfPages(numberOfPages: number): void {
        pagination.value.numberOfPages = numberOfPages;
    }

    function setFirst(first: boolean): void {
        pagination.value.first = first;
    }

    function setLast(last: boolean): void {
        pagination.value.last = last;
    }

    function setTotalResults(totalResults: number): void {
        pagination.value.totalResults = totalResults;
    }

    function setResults(results: Race[]): void {
        pagination.value.results = results;
    }

    function setSorting(sorting: SortingUpdateValue): void {
        pagination.value.sorting = {
            ...pagination.value.sorting,
            ...sorting,
        };
    }

    function setFilters(filters: FiltersUpdateValue): void {
        pagination.value.filters = {
            ...pagination.value.filters,
            ...filters,
        };
    }

    return {
        pagination,
        patchState,
        setPage,
        setPageSize,
        setNumberOfPages,
        setFirst,
        setLast,
        setTotalResults,
        setResults,
        setSorting,
        setFilters,
    };
});
