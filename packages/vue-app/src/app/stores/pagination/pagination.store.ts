import {
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_BY_ATTRIBUTE,
    DEFAULT_SORT_ORDER,
    QueryParamKeys,
    Race,
    SortableAttribute,
} from '@dnd-mapp/data';
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
        page: DEFAULT_PAGE,
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

    function constructQueryParams(): string {
        console.log('PaginationStore - construct query params');
        let queryParams = '';

        if (pagination.value.page !== DEFAULT_PAGE) {
            queryParams = addQueryParam(queryParams, QueryParamKeys.PAGE, pagination.value.page);
        }
        if (pagination.value.pageSize !== DEFAULT_PAGE_SIZE) {
            queryParams = addQueryParam(queryParams, QueryParamKeys.PAGE_SIZE, pagination.value.pageSize);
        }
        if (pagination.value.sorting.order !== DEFAULT_SORT_ORDER) {
            queryParams = addQueryParam(queryParams, QueryParamKeys.SORTING_ORDER, pagination.value.sorting.order);
        }
        if (pagination.value.sorting.byAttribute !== DEFAULT_SORT_BY_ATTRIBUTE) {
            queryParams = addQueryParam(
                queryParams,
                QueryParamKeys.SORTING_BY_ATTRIBUTE,
                pagination.value.sorting.byAttribute as SortableAttribute
            );
        }
        if (pagination.value.filters.hasTrait) {
            queryParams = addQueryParam(queryParams, QueryParamKeys.FILTER_TRAIT, pagination.value.filters.hasTrait);
        }
        return queryParams;
    }

    function addQueryParam(queryParams: string, key: string, value: string | number): string {
        console.log(`Pagination Store - add query param ('${key + ': ' + value}')`);
        if (!queryParams.startsWith('?')) {
            queryParams += '?';
        }
        if (!queryParams.endsWith('?')) {
            queryParams += '&';
        }
        return queryParams + `${key}=${value}`;
    }

    function patchState(value: PaginationStoreUpdateValue): void {
        console.log('PaginationStore - patch store sate', value);
        setPage(value.page);
        setPageSize(value.pageSize);
        setNumberOfPages(value.numberOfPages);
        setFirst(value.first);
        setLast(value.last);
        setTotalResults(value.totalResults);
        setResults(value.results);
    }

    function setPage(page: number): void {
        console.log('PaginationStore - set page', page);
        pagination.value.page = page;
    }

    function setPageSize(pageSize: number): void {
        console.log('PaginationStore - set pageSize', pageSize);
        pagination.value.pageSize = pageSize;
    }

    function setNumberOfPages(numberOfPages: number): void {
        console.log('PaginationStore - set numberOfPages', numberOfPages);
        pagination.value.numberOfPages = numberOfPages;
    }

    function setFirst(first: boolean): void {
        console.log('PaginationStore - set first', first);
        pagination.value.first = first;
    }

    function setLast(last: boolean): void {
        console.log('PaginationStore - set last', last);
        pagination.value.last = last;
    }

    function setTotalResults(totalResults: number): void {
        console.log('PaginationStore - set totalResults', totalResults);
        pagination.value.totalResults = totalResults;
    }

    function setResults(results: Race[]): void {
        console.log('PaginationStore - set results', results);
        pagination.value.results = results;
    }

    function setSorting(sorting: SortingUpdateValue): void {
        console.log('PaginationStore - set sorting', sorting);
        pagination.value.sorting = {
            ...pagination.value.sorting,
            ...sorting,
        };
    }

    function setFilters(filters: FiltersUpdateValue): void {
        console.log('PaginationStore - set filters', filters);
        pagination.value.filters = {
            ...pagination.value.filters,
            ...filters,
        };

        if (Object.keys(filters).length === 0) {
            delete pagination.value.filters.hasTrait;
        }
    }

    return {
        pagination,
        patchState,
        constructQueryParams,
        setPage,
        setSorting,
        setFilters,
    };
});
