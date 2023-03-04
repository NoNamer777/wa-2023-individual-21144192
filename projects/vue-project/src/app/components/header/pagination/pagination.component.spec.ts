import { mount } from '@vue/test-utils';
import PaginationComponent from './pagination.component.vue';
import { createMockRouter } from '../../../../testing';
import { expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

describe('PaginationComponent', () => {
    const router = createMockRouter(PaginationComponent);

    router.addRoute({
        path: '/overview',
        name: 'Overview',
        redirect: '/',
    });

    const testComponent = mount(PaginationComponent, {
        global: {
            plugins: [router, createTestingPinia()],
        },
    });

    it('should render', () => {
        expect(testComponent).not.toBeNull();
    });
});
