<template>
    <section class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5">{{ race.name }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <div class="d-flex justify-content-between">
                <img :src="race.imageUrl" :alt="race.name + ' image'" class="race-image flex-grow-0 flex-shrink-1" />
                <div class="flex-shrink-1 flex-grow-1">
                    <p class="d-flex justify-content-between">
                        <span class="fw-bold">Size:</span>
                        <span>{{ race.size }}</span>
                    </p>
                    <p class="d-flex justify-content-between">
                        <span class="fw-bold">Speed:</span>
                        <span>{{ race.speed }}</span>
                    </p>
                </div>
            </div>
            <hr />
            <h5>Traits</h5>
            <template v-if="race.traits?.length > 0">
                <div v-for="trait of race.traits" :key="trait.name">
                    <p class="fw-bold mb-0">
                        {{ trait.name }}
                    </p>
                    <p>
                        {{ trait.description }}
                    </p>
                </div>
            </template>
            <p v-else>This Race has no Traits...</p>
        </div>
    </section>
</template>

<script setup lang="ts">
interface RaceDetailsProps {
    race: unknown;
}

defineProps<RaceDetailsProps>();
</script>
