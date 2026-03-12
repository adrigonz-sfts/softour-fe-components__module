<template>
    <component
        :is="iconComponent"
        :class="`soft-icon--${props.size}`"
        :aria-label="props.label"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as Icons from '@heroicons/vue/24/outline';
import * as SolidIcons from '@heroicons/vue/24/solid';

const props = withDefaults(
    defineProps<{
        name: string;
        size?: 'xs' | 'sm' | 'md' | 'lg';
        type?: 'outline' | 'solid';
        label: string;
    }>(),
    {
        size: 'md',
        type: 'outline',
    }
);

const iconComponent = computed(() => {
    const iconSet = props.type === 'solid' ? SolidIcons : Icons;
    const name = `${props.name.charAt(0).toUpperCase()}${props.name.slice(1)}Icon`;
    return iconSet[name as keyof typeof Icons];
});
</script>

<style src="./SoftIcon.scss" scoped></style>
