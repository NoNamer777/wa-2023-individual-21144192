<template src="./pagination.component.html" />

<script setup lang="ts">
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';
import { computed } from 'vue';

const paginationStore = usePaginationStore();

const numberOfPages = computed<number>(() => {
    return paginationStore.getTotalNumberOfPages;
});

const isOnFirstPage = computed<boolean>(() => {
    return paginationStore.getCurrentPage === 1;
});

const isOnLastPage = computed<boolean>(() => {
    return paginationStore.getCurrentPage === paginationStore.getTotalNumberOfPages;
});

const previousPage = computed<number>(() => {
    return isOnFirstPage.value ? 1 : paginationStore.getCurrentPage - 1;
});

const nextPage = computed<number>(() => {
    return isOnLastPage.value ? paginationStore.getTotalNumberOfPages : paginationStore.getCurrentPage + 1;
});

function isOnPage(pageNumber: number): boolean {
    return paginationStore.getCurrentPage === pageNumber;
}
</script>
