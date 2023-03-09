<template>
    <li class="page-item" :class="{ disabled: disabled, active: isOnPage(pageNumber) }">
        <router-link
            class="page-link"
            :to="{ name: 'Overview', query: { ...queryParams, pageNumber: pageNumber } }"
            active-class="_active"
        >
            {{ label }}
        </router-link>
    </li>
</template>

<script lang="ts" setup>
import type { SortingFilteringQueryParams } from '@vue-app/app/models';
import { usePaginationStore } from '@vue-app/app/stores';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = withDefaults(defineProps<{ disabled: boolean; active: number; pageNumber: number; label: string }>(), {
    disabled: false,
    active: 1,
});

const queryParams = computed<SortingFilteringQueryParams>(() => useRoute().query as SortingFilteringQueryParams);

function isOnPage(pageNumber: number): boolean {
    if (isNaN(parseInt(props.label))) {
        return false;
    }
    return usePaginationStore().currentPage === pageNumber;
}
</script>
