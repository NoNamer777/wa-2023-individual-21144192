import { createPinia, setActivePinia } from 'pinia';
import { usePaginationStore } from './pagination.store';

describe('PaginationStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test('should determine the total pages', () => {
        const store = usePaginationStore();

        expect(store.pageSize).toEqual(5);
        expect(store.totalNumberOfPages).toEqual(0);

        store.determineTotalNumberOfPages(20);
        expect(store.totalNumberOfPages).toEqual(4);

        store.determineTotalNumberOfPages(4);
        expect(store.totalNumberOfPages).toEqual(1);
    });

    test('should set the sort order', () => {
        const store = usePaginationStore();

        expect(store.sorting).toEqual({ order: 'asc', onAttribute: null });

        store.setSorting({ order: 'desc' });
        expect(store.sorting).toEqual({ order: 'desc', onAttribute: null });
    });

    test('should set sorting on attribute', () => {
        const store = usePaginationStore();

        expect(store.sorting).toEqual({ order: 'asc', onAttribute: null });

        store.setSorting({ onAttribute: 'name' });
        expect(store.sorting).toEqual({ order: 'asc', onAttribute: 'name' });

        store.setSorting({ onAttribute: 'size' });
        expect(store.sorting).toEqual({ order: 'asc', onAttribute: 'size' });

        store.setSorting({ onAttribute: 'speed' });
        expect(store.sorting).toEqual({ order: 'asc', onAttribute: 'speed' });

        store.setSorting({ onAttribute: null });
        expect(store.sorting).toEqual({ order: 'asc', onAttribute: null });
    });

    test('should set filtering by attribute', () => {
        const store = usePaginationStore();

        expect(store.filters).toEqual({ byTrait: null });

        store.setFilters({ byTrait: 'darkvision' });
        expect(store.filters).toEqual({ byTrait: 'darkvision' });

        store.setFilters({ byTrait: null });
        expect(store.filters).toEqual({ byTrait: null });
    });

    test('should set the current page', () => {
        const store = usePaginationStore();

        expect(store.page).toEqual(1);

        // Expect nothing to have changed because the pages are unreachable
        store.setCurrentPage(3);
        expect(store.page).toEqual(1);

        store.setCurrentPage(-1);
        expect(store.page).toEqual(1);

        store.setCurrentPage(0);
        expect(store.page).toEqual(1);

        // We first need to let the store know there are more than the initial total number of pages, which is 0
        store.determineTotalNumberOfPages(20);
        store.setCurrentPage(3);
    });

    test('should reset', () => {
        const store = usePaginationStore();

        store.filters = { byTrait: 'darkvision' };
        store.sorting = { order: 'desc', onAttribute: 'speed' };
        store.page = 3;
        store.totalNumberOfPages = 5;

        expect(store.filters).toEqual({ byTrait: 'darkvision' });
        expect(store.sorting).toEqual({ onAttribute: 'speed', order: 'desc' });
        expect(store.page).toEqual(3);
        expect(store.totalNumberOfPages).toEqual(5);

        store.reset();

        expect(store.filters).toEqual({ byTrait: null });
        expect(store.sorting).toEqual({ onAttribute: null, order: 'asc' });
        expect(store.page).toEqual(1);
        expect(store.totalNumberOfPages).toEqual(5);
    });

    test('should get the current page', () => {
        const store = usePaginationStore();

        expect(store.getCurrentPage).toEqual(1);

        store.page = 4;
        expect(store.getCurrentPage).toEqual(4);
    });

    test('should get the page size', () => {
        const store = usePaginationStore();

        expect(store.getPageSize).toEqual(5);

        store.pageSize = 2;
        expect(store.getPageSize).toEqual(2);
    });

    test('should get the total number of page', () => {
        const store = usePaginationStore();

        expect(store.getTotalNumberOfPages).toEqual(0);

        store.totalNumberOfPages = 30;
        expect(store.getTotalNumberOfPages).toEqual(30);
    });

    test('should get the sorting order', () => {
        const store = usePaginationStore();

        expect(store.getSortingOrder).toEqual('asc');

        store.sorting.order = 'desc';
        expect(store.getSortingOrder).toEqual('desc');
    });

    test('should get the sorting on attribute', () => {
        const store = usePaginationStore();

        expect(store.getSortingOnAttribute).toBeNull();

        store.sorting.onAttribute = 'size';
        expect(store.getSortingOnAttribute).toEqual('size');
    });

    test('should get filters by trait', () => {
        const store = usePaginationStore();

        expect(store.getFiltersByTrait).toBeNull();

        store.filters.byTrait = 'darkvision';
        expect(store.getFiltersByTrait).toEqual('darkvision');
    });
});
