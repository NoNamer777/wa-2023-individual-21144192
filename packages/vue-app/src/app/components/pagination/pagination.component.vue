<template>
    <span class="navbar-text me-3">Showing {{ pagination.totalResults }} Races</span>
    <ul class="pagination pagination-sm mb-0">
        <PaginationLinkComponent :disabled="pagination.first" :pageNumber="previousPage" label="Previous" />
        <PaginationLinkComponent
            v-for="pageNumber of [...Array(pagination.numberOfPages).keys()].map((page) => page + 1)"
            :key="pageNumber"
            :page-number="pageNumber"
            :label="pageNumber.toString()"
            :active="pagination.page"
        />
        <PaginationLinkComponent :disabled="pagination.last" :pageNumber="nextPage" label="Next" />
    </ul>
</template>

<script setup lang="ts">
import { DEFAULT_PAGE } from '@dnd-mapp/data';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { usePaginationStore } from '../../stores';
import PaginationLinkComponent from '../pagination-link/pagination-link.component.vue';

const { pagination } = storeToRefs(usePaginationStore());

const previousPage = computed<number>(() =>
    pagination.value.page === DEFAULT_PAGE ? DEFAULT_PAGE : pagination.value.page - 1
);
const nextPage = computed<number>(() =>
    pagination.value.page === pagination.value.numberOfPages
        ? pagination.value.numberOfPages
        : pagination.value.page + 1
);
</script>
