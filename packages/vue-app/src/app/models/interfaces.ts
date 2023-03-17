import { SortableAttribute, SortOrder } from '@dnd-mapp/data';

export interface SortingFilteringForm {
    sorting: {
        order: SortOrder;
        byAttribute: SortableAttribute;
    };
    filters: {
        byTrait: string | null;
    };
}

export interface SortingFilteringQueryParams {
    page: string;
    order: SortOrder;
    sortingByAttribute: SortableAttribute;
    hasTrait: string;

    [key: string]: string;
}
