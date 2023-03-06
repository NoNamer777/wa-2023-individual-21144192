<template>
    <form class="h-100 d-flex flex-column gap-2" @submit.prevent="onSubmit">
        <div class="mb-3">
            <label class="form-label">Sorting on</label>
            <select class="form-select" v-model="form.sortingByAttribute">
                <template v-for="sortable of SORTABLE_ATTRIBUTES" :key="sortable.value">
                    <option :value="sortable.value">{{ sortable.label }}</option>
                </template>
            </select>
            <template v-for="order of SORTING_ORDERS" :key="order.value">
                <div class="form-check mt-2">
                    <input type="radio" class="form-check-input" v-model="form.sortingOrder" :value="order.value" />
                    <label class="form-check-label">{{ order.label }}</label>
                </div>
            </template>
        </div>
        <div class="mb-auto">
            <label class="form-label">Filter by Trait</label>
            <select class="form-select" v-model="form.filteringByTrait">
                <option :value="null"></option>
                <template v-for="traitOption in racialTraits" :key="traitOption">
                    <option :value="traitOption.value">{{ traitOption.label }}</option>
                </template>
            </select>
        </div>
        <button type="reset" class="btn btn-danger" :disabled="!hasFilters && !formIsDirty" @click.prevent="onReset">
            Reset
        </button>
        <button type="submit" class="btn btn-success" data-bs-dismiss="offcanvas" :disabled="!formIsDirty">
            Apply
        </button>
    </form>
</template>

<script setup lang="ts">
import {
    DEFAULT_SORTING_AND_FILTERING_FORM_STATE,
    formEquals,
    isValidSortableByAttribute,
    isValidSortingOrder,
    SORTABLE_ATTRIBUTES,
    type SortableAttribute,
    type SortingAndFilteringForm,
    type SortingAndFilteringQueryParams,
    SORTING_ORDERS,
    type SortingOrder,
    type TraitOption,
} from '@vue-project/app/models/pagination';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePaginationStore } from '@vue-project/app/stores/pagination/pagination.store';

interface FilteringAndSortingFormComponentProps {
    racialTraits: TraitOption[];
}

defineProps<FilteringAndSortingFormComponentProps>();

const router = useRouter();
const route = useRoute();

const hasFilters = ref<boolean>(false);
const formIsDirty = ref<boolean>(false);

const initialFormState = ref<SortingAndFilteringForm>({
    sortingByAttribute: getSortingByAttributeFromRoute(),
    sortingOrder: getSortingOrderFromRoute(),
    filteringByTrait: getFilteringByTraitFromRoute(),
});

const form = ref<SortingAndFilteringForm>({ ...initialFormState.value });

async function onSubmit(): Promise<void> {
    const queryParams: SortingAndFilteringQueryParams = {
        ...route.query,
        sortingOrder: form.value.sortingOrder,
        pageNumber: '1',
    };

    if (form.value.sortingByAttribute) {
        queryParams.sortingByAttribute = form.value.sortingByAttribute;
    }
    if (form.value.filteringByTrait) {
        queryParams.filteringByTrait = form.value.filteringByTrait;
    }
    initialFormState.value = { ...form.value };

    await router.push({ query: queryParams });
}

async function onReset(): Promise<void> {
    form.value = { ...DEFAULT_SORTING_AND_FILTERING_FORM_STATE };
    initialFormState.value = { ...DEFAULT_SORTING_AND_FILTERING_FORM_STATE };

    usePaginationStore().reset();

    await router.push({ query: {} });
}

function getSortingByAttributeFromRoute(): SortableAttribute {
    const sortingByAttributeQueryParam = route.query?.sortingByAttribute as string;

    if (isValidSortableByAttribute(sortingByAttributeQueryParam)) {
        return sortingByAttributeQueryParam as SortableAttribute;
    }
    return null;
}

function getSortingOrderFromRoute(): SortingOrder {
    const sortingOrderQueryParam = route.query?.sortingOrder as string;

    if (isValidSortingOrder(sortingOrderQueryParam)) {
        return sortingOrderQueryParam as SortingOrder;
    }
    return 'asc';
}

function getFilteringByTraitFromRoute(): string | null {
    const traitFilterQueryParam = route.query?.filteringByTrait as string;

    if (traitFilterQueryParam) {
        return traitFilterQueryParam as string;
    }
    return null;
}

watchEffect(() => {
    const formValue = { ...form.value };
    const initFormValue = { ...initialFormState.value };

    hasFilters.value = !formEquals(DEFAULT_SORTING_AND_FILTERING_FORM_STATE, formValue);
    formIsDirty.value = !formEquals(initFormValue, formValue);
});
</script>
