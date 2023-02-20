<template src="./filtering-and-sorting-form.component.html" />

<script setup lang="ts">
import {
    DEFAULT_SORTING_AND_FILTERING_FORM_STATE,
    formEquals,
    SORTABLE_ATTRIBUTES,
    type SortableAttribute,
    type SortingAndFilteringForm,
    type SortingAndFilteringQueryParams,
    SORTING_ORDERS,
    type SortingOrder,
    isValidSortingOrder,
    isValidSortableByAttribute,
} from '@vue-project/app/models/pagination';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const hasFilters = ref<boolean>(false);
const formIsDirty = ref<boolean>(false);

const initialFormState = ref<SortingAndFilteringForm>({
    sortingByAttribute: getSortingByAttributeFromRoute(),
    sortingOrder: getSortingOrderFromRoute(),
});

const form = ref<SortingAndFilteringForm>({ ...initialFormState.value });

async function onSubmit(): Promise<void> {
    const queryParams: SortingAndFilteringQueryParams = {
        ...route.query,
        sortingOrder: form.value.sortingOrder,
    };

    if (form.value.sortingByAttribute) {
        queryParams.sortingByAttribute = form.value.sortingByAttribute;
    }
    initialFormState.value = { ...form.value };

    await router.push({ query: queryParams });
}

function onReset(): void {
    form.value = { ...DEFAULT_SORTING_AND_FILTERING_FORM_STATE };
    initialFormState.value = { ...DEFAULT_SORTING_AND_FILTERING_FORM_STATE };

    router.push({ query: {} });
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

watchEffect(() => {
    const formValue = { ...form.value };
    const initFormValue = { ...initialFormState.value };

    hasFilters.value = !formEquals(DEFAULT_SORTING_AND_FILTERING_FORM_STATE, formValue);
    formIsDirty.value = !formEquals(initFormValue, formValue);
});
</script>
