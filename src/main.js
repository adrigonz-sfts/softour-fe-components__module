import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from '@/App.vue';
import { router } from '@/routes.ts';
import en from '@/locale/en.json';
import es from '@/locale/es.json';

const pinia = createPinia();

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        es,
    },
});

createApp(App).use(pinia).use(router).use(i18n).mount('#app');
