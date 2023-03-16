import { DEFAULT_PAGE_SIZE } from '@dnd-mapp/data';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Pagination {
    page: number;
    pageSize: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    totalResults: number;
}

export const usePaginationStore = defineStore('pagination', () => {
    const pagination = ref<Pagination>({
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        totalPages: 1,
        first: true,
        last: true,
        totalResults: 0,
    });

    function patchState(value: Partial<Pagination>): void {
        pagination.value = {
            ...pagination.value,
            ...value,
        };
    }

    function setPage(page: number): void {
        pagination.value = { ...pagination.value, page };
    }

    function setPageSize(pageSize: number): void {
        pagination.value = { ...pagination.value, pageSize };
    }

    function setTotalPages(totalPages: number): void {
        pagination.value = { ...pagination.value, totalPages };
    }

    function setFirst(first: boolean): void {
        pagination.value = { ...pagination.value, first };
    }

    function setLast(last: boolean): void {
        pagination.value = { ...pagination.value, last };
    }

    function setTotalResults(totalResults: number): void {
        pagination.value = { ...pagination.value, totalResults };
    }

    return { pagination, patchState, setPage, setPageSize, setTotalPages, setFirst, setLast, setTotalResults };
});
