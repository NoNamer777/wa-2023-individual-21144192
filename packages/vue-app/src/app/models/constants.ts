import { SortableAttribute, SortOrder } from '@dnd-mapp/data';
import { SortingFilteringForm } from './interfaces';

export const DEFAULT_SORTING_FILTERING_FORM_STATE: SortingFilteringForm = {
    sorting: {
        order: SortOrder.ASCENDING,
        byAttribute: SortableAttribute.NONE,
    },
    filters: {
        byTrait: null,
    },
};

export function isValidSortingOrder(value: string): boolean {
    return !value ? false : Object.keys(SortOrder).includes(value);
}

export function isValidSortableByAttribute(value: string): boolean {
    return !value ? false : Object.keys(SortableAttribute).includes(value);
}

export function formEquals(f1: SortingFilteringForm, f2: SortingFilteringForm): boolean {
    return (
        f1.sorting.order === f2.sorting.order &&
        f1.sorting.byAttribute === f2.sorting.byAttribute &&
        f1.filters.byTrait === f2.filters.byTrait
    );
}
