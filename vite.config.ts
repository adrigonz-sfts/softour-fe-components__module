/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
// Note: vite-plugin-dts is not used here so the dev server doesn't load it (avoids api-extractor errors).
// For .d.ts output you can run: npx vue-tsc --declaration --emitDeclarationOnly -p tsconfig.app.json (if you add that tsconfig).
export default defineConfig(({ command }) => {
    const plugins = [vue()];

    return {
        plugins,
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'SoftourFeComponents',
                fileName: (format) => `softour-fe-components.${format}.js`,
                formats: ['es', 'umd'],
            },
            rollupOptions: {
                external: [
                    'vue',
                    'vue-router',
                    'pinia',
                    'vue-i18n',
                    'oidc-client-ts',
                    '@heroicons/vue',
                    '@heroicons/vue/24/outline',
                    '@heroicons/vue/24/solid',
                ],
                output: {
                    globals: {
                        vue: 'Vue',
                        'vue-router': 'VueRouter',
                        pinia: 'Pinia',
                        'vue-i18n': 'VueI18n',
                        'oidc-client-ts': 'OidcClient',
                        '@heroicons/vue': 'HeroiconsVue',
                        '@heroicons/vue/24/outline': 'HeroiconsVueOutline',
                        '@heroicons/vue/24/solid': 'HeroiconsVueSolid',
                    },
                    assetFileNames: (assetInfo: any) => {
                        if (assetInfo.name === 'style.css') return 'softour-fe-components.css';
                        if (assetInfo.name && assetInfo.name.endsWith('.css'))
                            return 'softour-fe-components.css';
                        return assetInfo.name ?? 'asset';
                    },
                },
            },
            cssCodeSplit: false,
        },
        test: {
            globals: true,
            environment: 'happy-dom',
            exclude: ['**/node_modules/**', '**/dist/**', '**/__e2e__/**'],
            setupFiles: ['./src/test-setup.ts'],
            mockReset: true,
            restoreMocks: true,
            clearMocks: true,
            isolate: true,
            env: {
                VITE_PRODUCTION: 'false',
                VITE_WSO2_SERVER_URL: 'https://auth.softoursistemas.com/oauth2/token',
                VITE_WSO2_AUTH_WELLKNOWN_ENDPOINT_URL:
                    'https://auth.softoursistemas.com/oauth2/token/.well-known/openid-configuration',
                VITE_WSO2_CLIENT_ID: 'EP3arurDPUgUSC7aUhMeGB2R8t8a',
                VITE_WSO2_SCOPE: 'openid profile email roles',
                VITE_WSO2_RESPONSE_TYPE: 'code',
                VITE_WSO2_LOGOUT_URL: 'https://auth.softoursistemas.com/oidc/logout',
            },
            coverage: {
                provider: 'v8',
                reporter: ['text', 'html', 'lcov'],
                exclude: [
                    '**/node_modules/**',
                    '**/dist/**',
                    '**/__tests__/**',
                    '**/__e2e__/**',
                    '**/test-setup.ts',
                    '**/main.ts',
                    '**/index.ts',
                    '**/env.d.ts',
                    '**/routes.ts',
                    '**/*.spec.ts',
                    '**/*.d.ts',
                ],
            },
        },
    };
});
