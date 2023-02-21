import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import OverviewPage from '@vue-project/app/pages/overview/overview.page.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/overview',
    },
    {
        path: '/overview',
        name: 'Overview',
        component: OverviewPage,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active',
});
