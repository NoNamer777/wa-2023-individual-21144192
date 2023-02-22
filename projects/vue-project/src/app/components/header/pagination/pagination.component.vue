<template src="./pagination.component.html" />

<script setup lang="ts">
import type { SortingAndFilteringQueryParams } from '@vue-project/app/models/pagination';
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRaceStore } from '@vue-project/app/stores/race.store';

const route = useRoute();
const paginationStore = usePaginationStore();

const numberOfPages = computed<number>(() => paginationStore.getTotalNumberOfPages);
const isOnFirstPage = computed<boolean>(() => paginationStore.getCurrentPage === 1);
const isOnLastPage = computed<boolean>(() => paginationStore.getCurrentPage === paginationStore.getTotalNumberOfPages);
const previousPage = computed<number>(() => (isOnFirstPage.value ? 1 : paginationStore.getCurrentPage - 1));
const nextPage = computed<number>(() =>
    isOnLastPage.value ? paginationStore.getTotalNumberOfPages : paginationStore.getCurrentPage + 1
);
const queryParams = computed<SortingAndFilteringQueryParams>(() => route.query as SortingAndFilteringQueryParams);
const activeCollectionSize = computed<number>(() => useRaceStore().getActiveCollectionSize);

function isOnPage(pageNumber: number): boolean {
    return paginationStore.getCurrentPage === pageNumber;
}
</script>
