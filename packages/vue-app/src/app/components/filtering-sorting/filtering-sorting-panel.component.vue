<template>
    <form class="h-100 d-flex flex-column gap-2" @submit.prevent="onSubmit">
        <div class="mb-3">
            <label class="form-label">Sorting on</label>
            <select class="form-select" v-model="form.sorting.byAttribute">
                <template v-for="sortable of SORT_BY_ATTRIBUTE_OPTIONS" :key="sortable.value">
                    <option :value="sortable.value">{{ sortable.label }}</option>
                </template>
            </select>
            <template v-for="order of SORT_ORDER_OPTIONS" :key="order.value">
                <div class="form-check mt-2">
                    <label class="form-check-label">
                        <input
                            type="radio"
                            class="form-check-input"
                            :id="'sort-order-input-' + order.value"
                            name="sorting-order"
                            :value="order.value"
                            :checked="form.sorting.order === order.value"
                            @click="form.sorting.order = order.value"
                        />
                        {{ order.label }}
                    </label>
                </div>
            </template>
        </div>
        <div class="mb-auto">
            <label class="form-label">Filter by Trait</label>
            <select class="form-select" v-model="form.filters.byTrait">
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
    DEFAULT_FILTER_BY_TRAIT,
    DEFAULT_SORT_BY_ATTRIBUTE,
    DEFAULT_SORT_ORDER,
    SortableAttribute,
    SortOrder,
    SORT_BY_ATTRIBUTE_OPTIONS,
    SORT_ORDER_OPTIONS,
} from '@dnd-mapp/data';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { SortingFilteringForm, SortingFilteringQueryParams } from '../../models';
import {
    DEFAULT_SORTING_FILTERING_FORM_STATE,
    formEquals,
    isValidSortableByAttribute,
    isValidSortingOrder,
} from '../../models';

interface FilteringAndSortingFormComponentProps {
    racialTraits: unknown[];
}

defineProps<FilteringAndSortingFormComponentProps>();

const router = useRouter();
const route = useRoute();

const hasFilters = ref<boolean>(false);
const formIsDirty = ref<boolean>(false);

const initialFormState = ref<SortingFilteringForm>({
    sorting: {
        byAttribute: getSortingByAttributeFromRoute(),
        order: getSortingOrderFromRoute(),
    },
    filters: {
        byTrait: getFilteringByTraitFromRoute(),
    },
});

const form = ref<SortingFilteringForm>({ ...initialFormState.value });

async function onSubmit(): Promise<void> {
    // eslint-disable-next-line no-undef
    const queryParams = {
        ...route.query,
        order: form.value.sorting.order,
        page: '1',
    } as SortingFilteringQueryParams;

    if (form.value.sorting.byAttribute) {
        queryParams.sortingByAttribute = form.value.sorting.byAttribute;
    }
    if (form.value.filters.byTrait) {
        queryParams.hasTrait = form.value.filters.byTrait;
    }
    initialFormState.value = { ...form.value };

    await router.push({ query: queryParams });
}

async function onReset(): Promise<void> {
    form.value = { ...DEFAULT_SORTING_FILTERING_FORM_STATE };
    initialFormState.value = { ...DEFAULT_SORTING_FILTERING_FORM_STATE };

    await router.push({ query: {} });
}

function getSortingByAttributeFromRoute(): SortableAttribute {
    const sortingByAttributeQueryParam = route.query?.sortingByAttribute as string;

    if (isValidSortableByAttribute(sortingByAttributeQueryParam)) {
        return sortingByAttributeQueryParam as SortableAttribute;
    }
    return DEFAULT_SORT_BY_ATTRIBUTE;
}

function getSortingOrderFromRoute(): SortOrder {
    const sortingOrderQueryParam = route.query?.sortingOrder as string;

    if (isValidSortingOrder(sortingOrderQueryParam)) {
        return Object.keys(SortOrder)[
            Object.values(SortOrder).indexOf(sortingOrderQueryParam as SortOrder)
        ] as SortOrder;
    }
    return DEFAULT_SORT_ORDER;
}

function getFilteringByTraitFromRoute(): string | null {
    const traitFilterQueryParam = route.query?.filteringByTrait as string;

    if (traitFilterQueryParam) {
        return traitFilterQueryParam as string;
    }
    return DEFAULT_FILTER_BY_TRAIT;
}

watchEffect(() => {
    const formValue = { ...form.value };
    const initFormValue = { ...initialFormState.value };

    hasFilters.value = !formEquals(DEFAULT_SORTING_FILTERING_FORM_STATE, formValue);
    formIsDirty.value = !formEquals(initFormValue, formValue);
});
</script>
