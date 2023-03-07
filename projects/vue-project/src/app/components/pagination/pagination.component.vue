<template>
    <span class="navbar-text me-3">Showing {{ activeCollectionSize }} Races</span>
    <ul class="pagination pagination-sm mb-0">
        <PaginationLinkComponent :disabled="isOnFirstPage" :pageNumber="previousPage" label="Previous" />
        <PaginationLinkComponent
            v-for="pageNumber of paginationStore.totalNumberOfPages"
            :key="pageNumber"
            :page-number="pageNumber"
            :label="pageNumber.toString()"
            :active="pageNumber"
        />
        <PaginationLinkComponent :disabled="isOnLastPage" :pageNumber="nextPage" label="Next" />
    </ul>
</template>

<script setup lang="ts">
import { usePaginationStore, useRaceStore } from '@vue-project/app/stores';
import { computed } from 'vue';
import PaginationLinkComponent from '../pagination-link/pagination-link.component.vue';

const paginationStore = usePaginationStore();

const isOnFirstPage = computed<boolean>(() => paginationStore.currentPage === 1);
const isOnLastPage = computed<boolean>(() => paginationStore.currentPage === paginationStore.totalNumberOfPages);
const previousPage = computed<number>(() => (isOnFirstPage.value ? 1 : paginationStore.currentPage - 1));
const nextPage = computed<number>(() =>
    isOnLastPage.value ? paginationStore.totalNumberOfPages : paginationStore.currentPage + 1
);
const activeCollectionSize = computed<number>(() => useRaceStore().getActiveCollectionSize);
</script>
