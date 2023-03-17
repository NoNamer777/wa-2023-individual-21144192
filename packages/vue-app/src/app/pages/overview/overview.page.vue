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
            <div class="spinner-border" v-if="loading"></div>
            <template v-if="pagination.totalResults > 0">
                <race-card-component v-for="race in pagination.results" :key="race.id" :race="race" />
            </template>
            <p v-else>No data to show...</p>
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
            <filtering-sorting-panel-component />
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
    DEFAULT_PAGE,
    QueryParamKeys,
} from '@dnd-mapp/data';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { LocationQuery, useRoute, useRouter } from 'vue-router';
import { CreateRaceDialogComponent, FilteringSortingPanelComponent, RaceCardComponent } from '../../components';
import { RaceService } from '../../services';
import { usePaginationStore } from '../../stores';

const raceService = RaceService.instance;
const paginationStore = usePaginationStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);

const { pagination } = storeToRefs(paginationStore);

const unsubscribeAfterEachRoute = router.afterEach((to) => {
    updateStoreFromRoute(to.query);
    getData();
});

onBeforeMount(() => {
    updateStoreFromRoute(route.query);
    getData();
});

onBeforeUnmount(() => {
    unsubscribeAfterEachRoute();
});

function updateStoreFromRoute(queryParams: LocationQuery): void {
    const queryParamKeys = Object.keys(queryParams);

    if (queryParamKeys.includes(QueryParamKeys.PAGE)) {
        const pageQueryParam = parseInt(queryParams[QueryParamKeys.PAGE] as string);

        if (!isNaN(pageQueryParam)) {
            console.log('Updating paginationStore.pagination.page from route');
            paginationStore.setPage(pageQueryParam);
        }
    } else if (pagination.value.page !== DEFAULT_PAGE) {
        console.log('Resetting paginationStore.pagination.page from route');
        paginationStore.setPage(DEFAULT_PAGE);
    }
    }
}

async function getData(): Promise<void> {
    loading.value = true;

    const response = await raceService.getAll(paginationStore.getAsQueryParams());
    loading.value = false;

    paginationStore.patchState({
        page: response.page,
        numberOfPages: response.numberOfPages,
        pageSize: response.pageSize,
        first: response.first,
        last: response.last,
        totalResults: response.totalResults,
        results: response.results,
    });

    paginationStore.setSorting({ ...response.sorting });
    paginationStore.setFilters({ ...response.filters });
}
</script>
