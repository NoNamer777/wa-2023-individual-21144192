<template src="./overview.page.html"></template>
<style scoped lang="scss" src="./overview.page.scss"></style>

<script setup lang="ts">
import RaceCardComponent from '@vue-project/app/components/race-card/race-card.component.vue';
import { computed, onBeforeMount, reactive } from 'vue';
import { useRaceStore } from '@vue-project/app/stores/race.store';

const store = useRaceStore();

onBeforeMount(async () => {
    await store.initialize();
});

const shouldShowRaces = computed(() => {
    return store.getFilteredRaces === null || store.getFilteredRaces.length === 0;
});
</script>
