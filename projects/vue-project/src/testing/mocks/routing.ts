import type { RouteRecordRaw, RouteComponent } from 'vue-router';

export const mockRoutes: (component: RouteComponent) => RouteRecordRaw[] = (component) => [
    {
        path: '/',
        component: component,
    },
];
