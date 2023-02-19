<template src="./race-card.component.html"></template>
<style scoped lang="scss" src="./race-card.component.scss"></style>

<script setup lang="ts">
import type { Race } from '@vue-project/app/models/race';

interface RaceCardProps {
    race: Race;
}

const props = defineProps<RaceCardProps>();
</script>
