import { SortableAttribute, SortOrder } from '@dnd-mapp/data';
import { SortingFilteringForm } from './interfaces';

export const DEFAULT_SORTING_FILTERING_FORM_VALUE: SortingFilteringForm = {
    sorting: {
        order: SortOrder.ASCENDING,
        byAttribute: SortableAttribute.NONE,
    },
    filters: {},
};

export function isValidSortingOrder(value: string): boolean {
    return !value ? false : (Object.values(SortOrder) as string[]).includes(value);
}

export function isValidSortableByAttribute(value: string): boolean {
    return !value ? false : (Object.values(SortableAttribute) as string[]).includes(value);
}

export function formEquals(f1: SortingFilteringForm, f2: SortingFilteringForm): boolean {
    return (
        f1.sorting.order === f2.sorting.order &&
        f1.sorting.byAttribute === f2.sorting.byAttribute &&
        f1.filters.hasTrait === f2.filters.hasTrait
    );
}

export interface TraitOption {
    id: number;
    value: string;
    label: string;
}
