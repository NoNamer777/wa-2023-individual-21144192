<template src="./overview.page.html" />
<style scoped lang="scss" src="./overview.page.scss" />

<script setup lang="ts">
import RaceCardComponent from '@vue-project/app/pages/overview/race-card/race-card.component.vue';
import { computed, onBeforeMount } from 'vue';
import { useRaceStore } from '@vue-project/app/stores/race.store';

const raceStore = useRaceStore();

onBeforeMount(async () => {
    await raceStore.initialize();
});

const shouldShowRaces = computed(() => {
    return raceStore.getFilteredRaces === null || raceStore.getFilteredRaces.length === 0;
});
</script>
