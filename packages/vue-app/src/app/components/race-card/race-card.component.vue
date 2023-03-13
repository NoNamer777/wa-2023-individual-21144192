<template>
    <div class="card shadow-sm">
        <img :src="race.imgSrc" :alt="race.name + ' image'" class="card-img-top border-bottom race-image" />
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="card-title mb-0">{{ race.name }}</h5>
                <button
                    type="button"
                    class="btn btn-sm btn-primary rounded-pill"
                    data-bs-toggle="modal"
                    :data-bs-target="'#' + buildModalTarget"
                >
                    Details
                </button>
            </div>
            <p class="card-text d-flex justify-content-between">
                <span>Size:</span>
                <span>{{ race.size }}</span>
            </p>
            <p class="card-text d-flex justify-content-between">
                <span>Speed:</span>
                <span>{{ race.speed }}</span>
            </p>
        </div>
    </div>

    <Teleport to="#dialogs">
        <div class="modal fade" :id="buildModalTarget" tabindex="-1">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-fullscreen-md-down">
                <race-details-dialog-component :race="race" />
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.card {
    width: 20em;

    p.card-text:first-of-type {
        margin-bottom: 0;
    }
}

.modal-dialog {
    --bs-modal-width: 700px;
}
</style>

<script setup lang="ts">
import RaceDetailsDialogComponent from '../race-details-dialog/race-details-dialog.component.vue';
import { computed } from 'vue';

interface RaceCardProps {
    race: { name: string };
}

const props = defineProps<RaceCardProps>();

const buildModalTarget = computed(
    () => `race-${props.race.name.toLowerCase().replace(' ', '-').replace(`'`, '')}-modal`
);
</script>
