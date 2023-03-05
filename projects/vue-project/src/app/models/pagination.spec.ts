import { formEquals, isValidSortableByAttribute, isValidSortingOrder, SortingAndFilteringForm } from './pagination';

describe('PaginationModel', () => {
    it('should resolve valid sortable attributes', () => {
        expect(isValidSortableByAttribute(undefined)).toEqual(false);
        expect(isValidSortableByAttribute(null)).toEqual(false);
        expect(isValidSortableByAttribute('')).toEqual(false);
        expect(isValidSortableByAttribute('bob')).toEqual(false);

        expect(isValidSortableByAttribute('name')).toEqual(true);
        expect(isValidSortableByAttribute('size')).toEqual(true);
        expect(isValidSortableByAttribute('speed')).toEqual(true);
    });

    it('should resolve valid sorting orders', () => {
        expect(isValidSortingOrder(undefined)).toEqual(false);
        expect(isValidSortingOrder('')).toEqual(false);
        expect(isValidSortingOrder('bob')).toEqual(false);

        expect(isValidSortingOrder('asc')).toEqual(true);
        expect(isValidSortingOrder('desc')).toEqual(true);
    });

    it('should resolve equal forms', () => {
        const form1: SortingAndFilteringForm = {
            sortingByAttribute: 'name',
            sortingOrder: 'asc',
            filteringByTrait: 'Darkvision',
        };

        let form2: SortingAndFilteringForm = { ...form1 };

        expect(formEquals(form1, form2)).toEqual(true);

        form2.filteringByTrait = null;
        expect(formEquals(form1, form2)).toEqual(false);

        form2 = { ...form1, sortingOrder: 'desc' };
        expect(formEquals(form1, form2)).toEqual(false);

        form2 = { ...form1, sortingByAttribute: null };
        expect(formEquals(form1, form2)).toEqual(false);

        form2 = { ...form1, sortingByAttribute: 'size' };
        expect(formEquals(form1, form2)).toEqual(false);

        form2 = form1;
        expect(formEquals(form1, form2)).toEqual(true);
    });
});
