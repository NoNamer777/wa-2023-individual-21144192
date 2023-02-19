<template src="./overview.page.html"></template>

<script setup lang="ts">
import RaceCardComponent from '@vue-project/app/components/race-card/race-card.component.vue';
import { computed, onBeforeMount, reactive } from 'vue';
import { useRaceStore } from '@vue-project/app/stores/race.store';

const raceStore = useRaceStore();

onBeforeMount(async () => {
    await raceStore.initialize();
});

const shouldShowRaces = computed(() => {
    return raceStore.getFilteredRaces === null || raceStore.getFilteredRaces.length === 0;
});
</script>
