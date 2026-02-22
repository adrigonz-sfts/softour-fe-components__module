import { render } from '@testing-library/vue';
import type { Component } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import type { Pinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';
import { routes as defaultRoutes } from '@/routes';

type RenderOutput = ReturnType<typeof render>;

type I18nInstance = I18n<Record<string, never>, Record<string, never>, Record<string, never>, string, false>;

interface CustomRendererResult extends RenderOutput {
    router: Router;
    pinia: Pinia;
    i18n: I18nInstance;
}

interface CustomRendererBuilder {
    pinia: Pinia;
    withProps(props: Record<string, unknown>): CustomRendererBuilder;
    withSlots(slots: Record<string, unknown>): CustomRendererBuilder;
    withRoute(route: string): CustomRendererBuilder;
    withRoutes(routes: RouteRecordRaw[]): CustomRendererBuilder;
    withI18n(options: Record<string, unknown>): CustomRendererBuilder;
    build(): Promise<CustomRendererResult>;
}

export function customRenderer(component: Component): CustomRendererBuilder {
    const pinia = createPinia();
    setActivePinia(pinia);

    let _props: Record<string, unknown> = {};
    let _slots: Record<string, unknown> = {};
    let _routes: RouteRecordRaw[] = [...defaultRoutes];
    let _route = '/';
    let _i18nOptions: Record<string, unknown> = {};

    const builder: CustomRendererBuilder = {
        pinia,

        withProps(props: Record<string, unknown>) {
            _props = props;
            return builder;
        },

        withSlots(slots: Record<string, unknown>) {
            _slots = slots;
            return builder;
        },

        withRoute(route: string) {
            _route = route;
            return builder;
        },

        withRoutes(routes: RouteRecordRaw[]) {
            _routes = routes;
            return builder;
        },

        withI18n(options: Record<string, unknown>) {
            _i18nOptions = options;
            return builder;
        },

        async build(): Promise<CustomRendererResult> {
            const router = createRouter({
                history: createMemoryHistory(),
                routes: _routes,
            });

            const i18n = createI18n({
                legacy: false,
                locale: 'en',
                messages: {},
                missingWarn: false,
                fallbackWarn: false,
                ..._i18nOptions,
            });

            await router.push(_route);
            await router.isReady();

            const renderResult = render(component, {
                props: _props,
                slots: _slots,
                global: {
                    plugins: [router, pinia, i18n],
                },
            });

            return {
                ...renderResult,
                router,
                pinia,
                i18n,
            };
        },
    };

    return builder;
}
