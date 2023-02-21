<template src="./race-details.component.html"></template>

<script setup lang="ts">
import type { Race } from '@vue-project/app/models/race';

interface RaceDetailsProps {
    race: Race;
}

defineProps<RaceDetailsProps>();
</script>
