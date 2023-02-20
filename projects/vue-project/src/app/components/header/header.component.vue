<template src="./header.component.html" />

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PaginationComponent from '@vue-project/app/components/header/pagination/pagination.component.vue';
import { usePaginationStore } from '@vue-project/app/stores/pagination.store';

const paginationStore = usePaginationStore();

paginationStore.watchPageNumberParam();
</script>
