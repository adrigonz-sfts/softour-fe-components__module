import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve } from 'node:path';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    viteFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                '@': resolve(process.cwd(), 'src'),
            },
        };

        return config;
    },
};

export default config;
