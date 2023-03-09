import { DEFAULT_FILTERS, DEFAULT_PAGE_SIZE, DEFAULT_SORTING } from '@vue-project/app/models';
import type { FilterOptions, SortingOptions } from '@vue-project/app/models';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRaceStore } from '@vue-project/app';

export const usePaginationStore = defineStore('pagination', () => {
    const raceStore = useRaceStore();

    const page = ref<number>(1);
    const pageSize = ref<number>(DEFAULT_PAGE_SIZE);
    const sorting = ref<SortingOptions>({ ...DEFAULT_SORTING });
    const filters = ref<FilterOptions>({ ...DEFAULT_FILTERS });

    const totalNumberOfPages = computed<number>(() => {
        const numberOfRaces: number = raceStore.getActiveCollectionSize;
        return Math.ceil(numberOfRaces / pageSize.value);
    });

    function setCurrentPage(pageNumber: number): void {
        if (pageNumber <= 0 || pageNumber > totalNumberOfPages.value) return;
        page.value = pageNumber;
    }

    function setSorting(sortingValue: Partial<SortingOptions>): void {
        sorting.value = {
            ...sorting.value,
            ...sortingValue,
        };
    }

    function setFilters(filterValue: Partial<FilterOptions>): void {
        filters.value = {
            ...filters.value,
            ...filterValue,
        };
    }

    function reset(): void {
        page.value = 1;
        sorting.value = { ...DEFAULT_SORTING };
        filters.value = { ...DEFAULT_FILTERS };
    }

    return {
        currentPage: page,
        pageSize,
        sorting,
        filters,
        totalNumberOfPages,
        setCurrentPage,
        setSorting,
        setFilters,
        reset,
    };
});
