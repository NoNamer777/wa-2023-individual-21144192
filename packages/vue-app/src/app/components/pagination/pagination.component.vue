<template>
    <span class="navbar-text me-3">Showing {{ activeCollectionSize }} Races</span>
    <ul class="pagination pagination-sm mb-0">
        <PaginationLinkComponent :disabled="isOnFirstPage" :pageNumber="previousPage" label="Previous" />
        <PaginationLinkComponent
            v-for="pageNumber of []"
            :key="pageNumber"
            :page-number="pageNumber"
            :label="pageNumber.toString()"
            :active="pageNumber"
        />
        <PaginationLinkComponent :disabled="isOnLastPage" :pageNumber="nextPage" label="Next" />
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PaginationLinkComponent from '../pagination-link/pagination-link.component.vue';

const isOnFirstPage = computed<boolean>(() => false);
const isOnLastPage = computed<boolean>(() => false);
const previousPage = computed<number>(() => 1);
const nextPage = computed<number>(() => 1);
const activeCollectionSize = computed<number>(() => 1);
</script>
