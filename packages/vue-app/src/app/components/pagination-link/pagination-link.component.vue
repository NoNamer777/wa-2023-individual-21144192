<template>
    <li class="page-item" :class="{ disabled: disabled, active: isOnPage() }">
        <router-link
            class="page-link"
            :to="{ name: 'Overview', query: { ...queryParams, page: pageNumber } }"
            active-class="_active"
        >
            {{ label }}
        </router-link>
    </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = withDefaults(defineProps<{ disabled?: boolean; active?: number; pageNumber: number; label: string }>(), {
    disabled: false,
    active: 1,
});

const queryParams = computed(() => useRoute().query);

function isOnPage(): boolean {
    return !isNaN(parseInt(props.label)) && props.pageNumber === props.active;
}
</script>
