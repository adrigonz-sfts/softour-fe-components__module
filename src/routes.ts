import { createWebHashHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import Default from './views/Default/Default.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Default',
        component: Default,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
