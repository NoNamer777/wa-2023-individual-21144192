import { mount } from '@vue/test-utils';
import FooterComponent from './footer.component.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { mockRoutes } from '../../../testing';

describe('FooterComponent', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: mockRoutes(FooterComponent),
    });

    const testContainer = mount(FooterComponent, {
        global: {
            plugins: [router],
        },
    });

    it('should render the copyrights', () => {
        const footerText = testContainer.text();
        expect(footerText).toContain('© 2023 DnD Mapp');
    });
});
