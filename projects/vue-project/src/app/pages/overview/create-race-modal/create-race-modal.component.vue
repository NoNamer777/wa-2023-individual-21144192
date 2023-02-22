<template src="./create-race-modal.component.html"></template>

<script setup lang="ts">
import { type Race, sizeOrder, type Trait } from '@vue-project/app/models/race';
import { useRaceStore } from '@vue-project/app/stores/race.store';
import { ref } from 'vue';

const newRace = ref<Race>({ traits: [] as Trait[] } as Race);
const sizeOptions = ref<string[]>(Object.keys(sizeOrder));

function onAddTrait(): void {
    newRace.value.traits.push({ name: '', description: '' });
}

function onCreate(): void {
    useRaceStore().addNewRace(newRace.value);

    newRace.value = { traits: [] as Trait[] } as Race;
}
</script>
