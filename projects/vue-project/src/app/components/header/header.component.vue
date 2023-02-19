<template src="./header.component.html"></template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PaginationComponent from '../pagination/pagination.component.vue';
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';

const paginationStore = usePaginationStore();

paginationStore.watchPageNumberParam();
</script>
