import type { RouteRecordRaw, RouteComponent, Router } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const mockRoutes: (component: RouteComponent) => RouteRecordRaw[] = (component) => [
    {
        path: '/',
        component: component,
    },
];

export const createMockRouter: (component: RouteComponent) => Router = (component) =>
    createRouter({
        history: createWebHistory(),
        routes: mockRoutes(component),
    });
