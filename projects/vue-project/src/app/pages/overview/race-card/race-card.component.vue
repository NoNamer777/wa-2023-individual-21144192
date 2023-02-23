<template src="./race-card.component.html" />
<style scoped lang="scss" src="./race-card.component.scss" />

<script setup lang="ts">
import RaceDetailsComponent from './race-details/race-details.component.vue';
import type { Race } from '@vue-project/app/models/race';
import { computed } from 'vue';

interface RaceCardProps {
    race: Race;
}

const props = defineProps<RaceCardProps>();

const buildModalTarget = computed(
    () => `race-${props.race.name.toLowerCase().replace(' ', '-').replace(`'`, '')}-modal`
);
</script>
