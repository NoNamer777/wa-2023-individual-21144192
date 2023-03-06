<template>
    <article class="h-100 d-flex flex-column">
        <div class="px-3">
            <div class="d-flex justify-content-between">
                <h2>Races</h2>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#create-race-modal"
                >
                    New Race
                </button>
            </div>
            <p>
                Below here is an overview of some of the playable Races that you can choose for your player character.
            </p>
        </div>
        <hr class="flex-grow-0 flex-shrink-0" />
        <section class="flex-grow-1 flex-shrink-1 d-flex flex-wrap justify-content-center align-items-center gap-3">
            <div class="spinner-border" v-if="!shouldShowRaces"></div>
            <template v-else v-for="race in races" :key="race.name">
                <race-card-component :race="race" />
            </template>
        </section>
        <button
            type="button"
            class="btn btn-primary rounded-circle position-absolute p-3 filter-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#filter-sorting-panel"
        >
            <fa-icon icon="filter" size="2x" />
        </button>
    </article>

    <aside class="offcanvas offcanvas-end" tabindex="-1" id="filter-sorting-panel">
        <section class="offcanvas-header">
            <h5 class="offcanvas-title">Filters and Sorting</h5>
            <button type="button" class="btn btn-close" data-bs-dismiss="offcanvas" />
        </section>
        <section class="offcanvas-body">
            <filtering-and-sorting-form-component :racial-traits="racialTraits" />
        </section>
    </aside>

    <Teleport to="#modals">
        <div class="modal fade" id="create-race-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-fullscreen-md-down">
                <create-race-modal-component />
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.filter-btn {
    right: 8em;
    bottom: 8em;
}
</style>

<script setup lang="ts">
import {
    CreateRaceModalComponent,
    FilteringAndSortingFormComponent,
    RaceCardComponent,
} from '@vue-project/app/components';
import { isValidSortableByAttribute, isValidSortingOrder } from '@vue-project/app/models/pagination';
import type { SortingAndFilteringQueryParams } from '@vue-project/app/models/pagination';
import type { Race, TraitOption } from '@vue-project/app/models/race';
import { usePaginationStore } from '@vue-project/app/stores/pagination/pagination.store';
import { useRaceStore } from '@vue-project/app/stores/race/race.store';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const paginationStore = usePaginationStore();
const raceStore = useRaceStore();

const shouldShowRaces = computed<boolean>(() => paginationStore.getTotalNumberOfPages > 0);

const races = ref<Race[]>([]);
const racialTraits = ref<TraitOption[]>([]);

const unsubscribeRouterQueryParams = useRouter().afterEach((to) =>
    updatePagination(to.query as SortingAndFilteringQueryParams)
);

onBeforeMount(async () => {
    const queryParams = useRoute().query as SortingAndFilteringQueryParams;

    await raceStore.initialize();

    updatePagination(queryParams);

    racialTraits.value = raceStore.getAllTraits;
    races.value = raceStore.getFilteredRaces;
});

onBeforeUnmount(() => {
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
        paginationStore.setSortOrder(queryParams.sortingOrder as SortingOrder);
    }
    if (isValidSortableByAttribute(queryParams.sortingByAttribute)) {
        paginationStore.setSortingByAttribute(queryParams.sortingByAttribute as SortableAttribute);
    }
    if (queryParams.filteringByTrait) {
        paginationStore.setFilteringByTrait(queryParams.filteringByTrait);
    }
}

paginationStore.$onAction(({ after }) => after(() => onChange()));
</script>
