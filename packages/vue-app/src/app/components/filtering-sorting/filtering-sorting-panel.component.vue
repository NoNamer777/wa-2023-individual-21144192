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
                <template v-for="traitOption of []" :key="traitOption">
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
import { SORT_BY_ATTRIBUTE_OPTIONS, SORT_ORDER_OPTIONS } from '@dnd-mapp/data';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { SortingFilteringForm, SortingFilteringQueryParams } from '../../models';
import { DEFAULT_SORTING_FILTERING_FORM_STATE, formEquals } from '../../models';
import { usePaginationStore } from '../../stores';

const router = useRouter();
const route = useRoute();

const { pagination } = storeToRefs(usePaginationStore());

const hasFilters = ref<boolean>(false);
const formIsDirty = ref<boolean>(false);

const initialFormState = ref<SortingFilteringForm>({
    sorting: pagination.value.sorting,
    filters: pagination.value.filters,
});

const form = ref<SortingFilteringForm>({ ...initialFormState.value });

async function onSubmit(): Promise<void> {
    const queryParams = {
        ...route.query,
        order: form.value.sorting.order,
        page: '1',
    } as SortingFilteringQueryParams;

    if (form.value.sorting.byAttribute) {
        queryParams.sortingByAttribute = form.value.sorting.byAttribute;
    }
    if (form.value.filters.byTrait) {
        queryParams.hasTrait = form.value.filters.byTrait as string;
    }
    initialFormState.value = { ...form.value };

    await router.push({ query: queryParams });
}

async function onReset(): Promise<void> {
    form.value = { ...DEFAULT_SORTING_FILTERING_FORM_STATE };
    initialFormState.value = { ...DEFAULT_SORTING_FILTERING_FORM_STATE };

    await router.push({ query: {} });
}

watchEffect(() => {
    const formValue = { ...form.value };
    const initFormValue = { ...initialFormState.value };

    hasFilters.value = !formEquals(DEFAULT_SORTING_FILTERING_FORM_STATE, formValue);
    formIsDirty.value = !formEquals(initFormValue, formValue);
});
</script>
