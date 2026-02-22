/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
    const plugins = [vue()];

    if (command === 'build') {
        const { default: dts } = await import('vite-plugin-dts');
        plugins.push(
            dts({
                include: ['src/index.ts', 'src/core/**/*', 'src/store/**/*', 'src/views/login/modules/Auth/Auth.vue', 'src/views/callback/modules/AuthCallback/AuthCallback.vue'],
                exclude: ['src/**/__tests__/**', 'src/**/*.spec.ts', 'src/main.ts', 'src/App.vue', 'src/routes.ts'],
                tsconfigPath: './tsconfig.json',
            }),
        );
    }

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
                name: 'WSO2LoginModule',
                fileName: (format) => `wso2-login-module.${format}.js`,
                formats: ['es', 'umd'],
            },
            rollupOptions: {
                external: ['vue', 'vue-router', 'pinia', 'oidc-client-ts'],
                output: {
                    globals: {
                        vue: 'Vue',
                        'vue-router': 'VueRouter',
                        pinia: 'Pinia',
                        'oidc-client-ts': 'OidcClient',
                    },
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name === 'style.css') return 'wso2-login-module.css';
                        if (assetInfo.name?.endsWith('.css')) return 'wso2-login-module.css';
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
                VITE_WSO2_AUTH_WELLKNOWN_ENDPOINT_URL: 'https://auth.softoursistemas.com/oauth2/token/.well-known/openid-configuration',
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
