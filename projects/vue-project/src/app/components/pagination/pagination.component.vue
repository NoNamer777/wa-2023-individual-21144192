<template>
    <span class="navbar-text me-3">Showing {{ activeCollectionSize }} Races</span>
    <ul class="pagination pagination-sm mb-0">
        <li class="page-item" :class="{ disabled: isOnFirstPage }">
            <router-link
                class="page-link"
                :to="{ name: 'Overview', query: { ...queryParams, pageNumber: previousPage } }"
                active-class="_active"
            >
                Previous
            </router-link>
        </li>
        <li
            class="page-item"
            v-for="pageNumber in numberOfPages"
            :key="pageNumber"
            :class="{ active: isOnPage(pageNumber) }"
        >
            <span class="page-link" v-if="isOnPage(pageNumber)">{{ pageNumber }}</span>
            <router-link
                class="page-link"
                v-else
                :to="{ name: 'Overview', query: { ...queryParams, pageNumber: pageNumber } }"
                active-class="_active"
            >
                {{ pageNumber }}
            </router-link>
        </li>
        <li class="page-item" :class="{ disabled: isOnLastPage }">
            <router-link
                class="page-link"
                :to="{ name: 'Overview', query: { ...queryParams, pageNumber: nextPage } }"
                active-class="_active"
            >
                Next
            </router-link>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { SortingAndFilteringQueryParams } from '@vue-project/app/models';
import { usePaginationStore, useRaceStore } from '@vue-project/app/stores';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
