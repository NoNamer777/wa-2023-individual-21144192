<template>
    <div class="card shadow-sm">
        <img :src="race.imageUrl" :alt="race.name + ' image'" class="card-img-top border-bottom race-image" />
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
import { Race } from '@dnd-mapp/data';
import { computed, onBeforeMount, ref } from 'vue';
import { RaceService } from '../../services';
import RaceDetailsDialogComponent from '../race-details-dialog/race-details-dialog.component.vue';

interface RaceCardProps {
    race: Race;
}

const props = defineProps<RaceCardProps>();
const raceService = RaceService.instance;

const race = ref<Race>(props.race);

const buildModalTarget = computed(
    () => `race-${race.value.name.toLowerCase().replace(' ', '-').replace(`'`, '')}-modal`
);

onBeforeMount(() => {
    getRaceDetails();
});

async function getRaceDetails(): Promise<void> {
    race.value = await raceService.getById(props.race.id);
}
</script>
