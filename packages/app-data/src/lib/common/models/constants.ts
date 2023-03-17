import { SortableAttribute, SortOrder } from './pagination.model';

export const MIN_ENTITY_NAME_LENGTH = 3;

export const MIN_ENTITY_DESCRIPTION_LENGTH = 16;

export const SORT_BY_ATTRIBUTE_OPTIONS = Object.entries(SortableAttribute).map(([key, attribute]) => {
    if (attribute === '') return { value: '', label: '' };
    return {
        value: attribute,
        label: key.slice(0, 1).toUpperCase() + key.toLowerCase().slice(1),
    };
});

export const DEFAULT_SORT_BY_ATTRIBUTE = SortableAttribute.NONE;

export const SORT_ORDER_OPTIONS = Object.entries(SortOrder).map(([key, order]) => ({
    value: order,
    label: key.slice(0, 1).toUpperCase() + key.toLowerCase().slice(1),
}));

export const DEFAULT_SORT_ORDER: SortOrder = SortOrder.ASCENDING;

export const DEFAULT_PAGE_SIZE = 5;

export const DEFAULT_FILTER_BY_TRAIT = null;
