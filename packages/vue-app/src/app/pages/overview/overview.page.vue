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
            <filtering-sorting-panel-component :racial-traits="racialTraits" />
        </section>
    </aside>

    <Teleport to="#dialogs">
        <div class="modal fade" id="create-race-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-fullscreen-md-down">
                <create-race-dialog-component />
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
    CreateRaceDialogComponent,
    FilteringSortingPanelComponent,
    RaceCardComponent,
} from '@vue-app/app/components';
import {
    DEFAULT_FILTERS,
    DEFAULT_SORTING,
    isValidSortableByAttribute,
    isValidSortingOrder,
} from '@vue-app/app/models';
import type { SortingFilteringQueryParams, Race, TraitOption } from '@vue-app/app/models';
import { usePaginationStore, useRaceStore } from '@vue-app/app/stores';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const paginationStore = usePaginationStore();
const raceStore = useRaceStore();

const shouldShowRaces = computed<boolean>(() => paginationStore.totalNumberOfPages > 0);

const races = ref<Race[]>([]);
const racialTraits = ref<TraitOption[]>([]);

const unsubscribeRouterQueryParams = useRouter().afterEach((to) =>
    updatePagination(to.query as SortingFilteringQueryParams)
);

onBeforeMount(async () => {
    const queryParams = useRoute().query as SortingFilteringQueryParams;

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

function updatePagination(queryParams: SortingFilteringQueryParams): void {
    if (queryParams.pageNumber) {
        paginationStore.setCurrentPage(parseInt(queryParams.pageNumber));
    } else if (paginationStore.currentPage !== 1) {
        paginationStore.setCurrentPage(1);
    }
    if (isValidSortingOrder(queryParams.sortingOrder)) {
        paginationStore.setSorting({ order: queryParams.sortingOrder });
    } else if (paginationStore.sorting.order !== DEFAULT_SORTING.order) {
        paginationStore.setSorting({ order: DEFAULT_SORTING.order });
    }
    if (isValidSortableByAttribute(queryParams.sortingByAttribute)) {
        paginationStore.setSorting({ onAttribute: queryParams.sortingByAttribute });
    } else if (paginationStore.sorting.onAttribute !== DEFAULT_SORTING.onAttribute) {
        paginationStore.setSorting({ onAttribute: DEFAULT_SORTING.onAttribute });
    }
    if (queryParams.filteringByTrait) {
        paginationStore.setFilters({ byTrait: queryParams.filteringByTrait });
    } else if (paginationStore.filters.byTrait !== DEFAULT_FILTERS.byTrait) {
        paginationStore.setFilters({ byTrait: DEFAULT_FILTERS.byTrait });
    }
}

paginationStore.$onAction(({ after }) => after(() => onChange()));
</script>
