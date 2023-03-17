import { createPinia, setActivePinia } from 'pinia';

describe.skip('PaginationStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should skip', () => {
        expect(true).toEqual(true);
    });
});
