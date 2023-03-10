import { createPinia, setActivePinia } from 'pinia';
import { usePaginationStore } from './pagination.store';
import { useRaceStore } from '../race/race.store';

describe('PaginationStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test('should determine the total pages', () => {
        const paginationStore = usePaginationStore();
        const raceStore = useRaceStore();

        expect(paginationStore.pageSize).toEqual(5);
        expect(paginationStore.totalNumberOfPages).toEqual(0);

        raceStore.filtered = new Array(20);
        expect(paginationStore.totalNumberOfPages).toEqual(4);

        raceStore.filtered = new Array(4);
        expect(paginationStore.totalNumberOfPages).toEqual(1);
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
        const paginationStore = usePaginationStore();
        const raceStore = useRaceStore();

        expect(paginationStore.currentPage).toEqual(1);

        // Expect nothing to have changed because the pages are unreachable
        paginationStore.setCurrentPage(3);
        expect(paginationStore.currentPage).toEqual(1);

        paginationStore.setCurrentPage(-1);
        expect(paginationStore.currentPage).toEqual(1);

        paginationStore.setCurrentPage(0);
        expect(paginationStore.currentPage).toEqual(1);

        // We first need to let the store know there are more than the initial total number of pages, which is 0
        raceStore.filtered = new Array(20);
        paginationStore.setCurrentPage(3);
    });

    test('should reset', () => {
        const paginationStore = usePaginationStore();
        const raceStore = useRaceStore();

        paginationStore.filters = { byTrait: 'darkvision' };
        paginationStore.sorting = { order: 'desc', onAttribute: 'speed' };
        paginationStore.currentPage = 3;
        raceStore.filtered = new Array(24);

        expect(paginationStore.filters).toEqual({ byTrait: 'darkvision' });
        expect(paginationStore.sorting).toEqual({ onAttribute: 'speed', order: 'desc' });
        expect(paginationStore.currentPage).toEqual(3);
        expect(paginationStore.totalNumberOfPages).toEqual(5);

        paginationStore.reset();

        expect(paginationStore.filters).toEqual({ byTrait: null });
        expect(paginationStore.sorting).toEqual({ onAttribute: null, order: 'asc' });
        expect(paginationStore.currentPage).toEqual(1);
        expect(paginationStore.totalNumberOfPages).toEqual(5);
    });
});
