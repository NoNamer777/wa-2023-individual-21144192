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
            <select class="form-select" v-model="form.filters.hasTrait">
                <option :value="null"></option>
                <template v-for="traitOption of traits" :key="traitOption.id">
                    <option :value="traitOption.value">{{ traitOption.label }}</option>
                </template>
            </select>
        </div>
        <button type="reset" class="btn btn-danger" :disabled="!formIsDirty && formIsDefault" @click.prevent="onReset">
            Reset
        </button>
        <button type="submit" class="btn btn-success" data-bs-dismiss="offcanvas" :disabled="!formIsDirty">
            Apply
        </button>
    </form>
</template>

<script setup lang="ts">
import { DEFAULT_PAGE, QueryParamKeys, SORT_BY_ATTRIBUTE_OPTIONS, SORT_ORDER_OPTIONS } from '@dnd-mapp/data';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { SortingFilteringForm, SortingFilteringQueryParams, TraitOption } from '../../models';
import { DEFAULT_SORTING_FILTERING_FORM_VALUE, formEquals } from '../../models';
import { TraitService } from '../../services';
import { usePaginationStore } from '../../stores';

const router = useRouter();
const route = useRoute();
const traitService = TraitService.instance;

const { pagination } = storeToRefs(usePaginationStore());

const initialFormValue = ref<SortingFilteringForm>({
    sorting: { ...pagination.value.sorting },
    filters: { ...pagination.value.filters },
});

const form = ref<SortingFilteringForm>({
    sorting: { ...initialFormValue.value.sorting },
    filters: { ...initialFormValue.value.filters },
});

const formIsDirty = computed(() => !formEquals(form.value, initialFormValue.value));
const formIsDefault = computed(() => formEquals(form.value, DEFAULT_SORTING_FILTERING_FORM_VALUE));

const traits = ref<TraitOption[]>([]);

onBeforeMount(() => {
    fetchTraits();
});

async function onSubmit(): Promise<void> {
    const queryParams = {
        ...route.query,
        [QueryParamKeys.SORTING_ORDER]: form.value.sorting.order,
        [QueryParamKeys.PAGE]: `${DEFAULT_PAGE}`,
    } as SortingFilteringQueryParams;

    if (form.value.sorting.byAttribute) {
        queryParams[QueryParamKeys.SORTING_BY_ATTRIBUTE] = form.value.sorting.byAttribute;
    }
    if (form.value.filters.hasTrait) {
        queryParams[QueryParamKeys.FILTER_TRAIT] = form.value.filters.hasTrait as string;
    }
    initialFormValue.value = {
        sorting: { ...form.value.sorting },
        filters: { ...form.value.filters },
    };
    await router.push({ query: queryParams });
}

async function onReset(): Promise<void> {
    form.value = {
        sorting: { ...DEFAULT_SORTING_FILTERING_FORM_VALUE.sorting },
        filters: { ...DEFAULT_SORTING_FILTERING_FORM_VALUE.filters },
    };
    initialFormValue.value = {
        sorting: { ...DEFAULT_SORTING_FILTERING_FORM_VALUE.sorting },
        filters: { ...DEFAULT_SORTING_FILTERING_FORM_VALUE.filters },
    };

    await router.push({ query: {} });
}

async function fetchTraits(): Promise<void> {
    traits.value = (await traitService.getAll()).map((trait) => ({
        id: trait.id,
        label: trait.name,
        value: trait.name.toLowerCase().replace(/'/g, '').replace(/ /g, '-'),
    }));
}
</script>
