import { mount } from '@vue/test-utils';
import FooterComponent from './footer.component.vue';
import { createMockRouter } from '../../../testing';

describe('FooterComponent', () => {
    const router = createMockRouter(FooterComponent);

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
