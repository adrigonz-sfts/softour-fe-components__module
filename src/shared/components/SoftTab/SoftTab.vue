<template>
    <component
        :is="props.to ? 'router-link' : 'button'"
        class="soft-tab"
        :class="{
            [`soft-tab--${props.variant}`]: true,
            'soft-tab--active': props.isActive,
            'soft-tab--disabled': props.disabled,
        }"
        :to="props.to"
        :aria-disabled="props.disabled"
    >
        <SoftIcon
            class="soft-tab__icon"
            :name="props.iconName"
            :label="props.iconLabel ?? props.text"
            size="md"
        />

        <span class="soft-tab__text body-sm">{{ props.text }}</span>
    </component>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import SoftIcon from '../SoftIcon/SoftIcon.vue';

interface SoftTabProps {
    iconName: string;
    text: string;
    variant?: 'underline' | 'filled';
    isActive?: boolean;
    to?: RouteLocationRaw;
    disabled?: boolean;
    /** Aria-label for the icon (defaults to text when not set) */
    iconLabel?: string;
}

const props = withDefaults(defineProps<SoftTabProps>(), {
    variant: 'underline',
    isActive: false,
    disabled: false,
    to: undefined,
    iconLabel: undefined,
});
</script>

<style src="./SoftTab.scss" lang="scss" scoped></style>
