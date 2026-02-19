import { createWebHashHistory, createRouter, type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    // Define your routes here
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
