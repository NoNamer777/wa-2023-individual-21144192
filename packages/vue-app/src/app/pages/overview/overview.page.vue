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
import { CreateRaceDialogComponent, FilteringSortingPanelComponent, RaceCardComponent } from '@vue-app/app/components';
import { computed, ref } from 'vue';

const shouldShowRaces = computed<boolean>(() => false);

const races = ref<unknown[]>([]);
const racialTraits = ref<unknown[]>([]);
</script>
