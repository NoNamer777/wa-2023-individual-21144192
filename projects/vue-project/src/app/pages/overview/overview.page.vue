<template src="./overview.page.html" />
<style scoped lang="scss" src="./overview.page.scss" />

<script setup lang="ts">
import {
    isValidSortableByAttribute,
    isValidSortingOrder,
    type SortingAndFilteringQueryParams,
} from '@vue-project/app/models/pagination';
import CreateRaceModalComponent from './create-race-modal/create-race-modal.component.vue';
import FilteringAndSortingFormComponent from './filtering-and-sorting/filtering-and-sorting-form.component.vue';
import RaceCardComponent from './race-card/race-card.component.vue';
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';
import { useRaceStore } from '@vue-project/app/stores/race.store';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const paginationStore = usePaginationStore();
const raceStore = useRaceStore();

const shouldShowRaces = computed<boolean>(() => paginationStore.getTotalNumberOfPages > 0);

const races = ref([]);
const racialTraits = ref([]);

const unsubscribeRouterQueryParams = useRouter().afterEach((to) => updatePagination(to.query));

onBeforeMount(async () => {
    const queryParams = useRoute().query;

    await raceStore.initialize();

    updatePagination(queryParams);

    racialTraits.value = raceStore.getAllTraits;
    races.value = raceStore.getFilteredRaces;
});

onBeforeUnmount(() => {
    unsubscribeRouterAfterEachHook();
    unsubscribeRouterQueryParams();
});

function onChange(): void {
    races.value = raceStore.getFilteredRaces;
}

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
    if (queryParams.filteringByTrait) {
        paginationStore.setFilteringByTrait(queryParams.filteringByTrait);
    }
}

paginationStore.$onAction(({ after }) => after(() => onChange()));
</script>
