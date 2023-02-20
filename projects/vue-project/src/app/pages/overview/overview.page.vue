<template src="./overview.page.html" />
<style scoped lang="scss" src="./overview.page.scss" />

<script setup lang="ts">
import {
    isValidSortableByAttribute,
    isValidSortingOrder,
    type SortingAndFilteringQueryParams,
} from '@vue-project/app/models/pagination';
import FilteringAndSortingFormComponent from '@vue-project/app/pages/overview/filtering-and-sorting/filtering-and-sorting-form.component.vue';
import RaceCardComponent from '@vue-project/app/pages/overview/race-card/race-card.component.vue';
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';
import { useRaceStore } from '@vue-project/app/stores/race.store';
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const paginationStore = usePaginationStore();
const raceStore = useRaceStore();

const unsubscribeRouterQueryParams = useRouter().afterEach((to) => updatePagination(to.query));

onBeforeMount(async () => {
    updatePagination(useRoute().query);

    await raceStore.initialize();
});

onBeforeUnmount(() => {
    unsubscribeRouterAfterEachHook();
    unsubscribeRouterQueryParams();
});

const shouldShowRaces = computed<boolean>(() => paginationStore.getTotalNumberOfPages > 0);

function updatePagination(queryParams: SortingAndFilteringQueryParams): void {
    if (queryParams.pageNumber) {
        paginationStore.setCurrentPage(parseInt(queryParams.pageNumber));
    }
    if (isValidSortingOrder(queryParams.sortingOrder)) {
        paginationStore.setSortOrder(queryParams.sortingOrder);
    }
    if (isValidSortableByAttribute(queryParams.sortingByAttribute)) {
        paginationStore.setSortingByAttribute(queryParams.sortingByAttribute);
    }
}
</script>
