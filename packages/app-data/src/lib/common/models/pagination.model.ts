import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_ORDER } from './constants';

export enum SortableAttribute {
    NONE = '',
    NAME = 'name',
    SIZE = 'size',
    SPEED = 'speed',
}

export enum SortOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc',
}

export interface Sorting {
    order: SortOrder;
    byAttribute?: SortableAttribute;
}

export interface Filters {
    hasTrait?: string;

    [filter: string]: string | boolean | number | undefined;
}

export class PaginationResponse<T> {
    @ApiProperty({ name: 'pageSize', type: Number, minimum: 1, default: DEFAULT_PAGE_SIZE })
    pageSize = DEFAULT_PAGE_SIZE;

    @ApiProperty({ name: 'page', type: Number, minimum: 1, default: DEFAULT_PAGE })
    page = DEFAULT_PAGE;

    @ApiProperty({ name: 'numberOfPages', type: Number, minimum: 1, default: 1 })
    numberOfPages = 1;

    @ApiProperty({ name: 'page', type: Boolean, default: false })
    first = false;

    @ApiProperty({ name: 'last', type: Boolean, default: false })
    last = false;

    @ApiProperty({ name: 'totalResults', type: Number, minimum: 0, default: 0 })
    totalResults = 0;

    results: T[] = [];

    @ApiProperty({
        name: 'page',
        type: {
            order: { name: 'order', enum: ['asc', 'desc'], enumName: 'SortOrder' },
            byAttribute: {
                name: 'byAttribute',
                enum: ['', 'name', 'size', 'speed'],
                enumName: 'SortableAttribute',
                default: undefined,
            },
        },
        default: DEFAULT_SORT_ORDER,
    })
    sorting: Sorting = {
        order: DEFAULT_SORT_ORDER,
    };

    @ApiProperty({
        name: 'filters',
        type: { hasTrait: { name: 'hasTrait', type: String, default: undefined } },
        default: undefined,
    })
    filters?: Filters;

    constructor(results: T[]) {
        this.results = results;
    }
}
